const fs = require('node:fs/promises')
const { randomUUID } = require('node:crypto')
// Preserve upstream's load order across the Auth/Database circular dependency.
require('/app/dist-server/server/Server')
const Database = require('/app/dist-server/server/Database')
const TokenManager = require('/app/dist-server/server/auth/TokenManager')
const jwt = require('/app/dist-server/server/libs/jsonwebtoken')
const bcrypt = require('/app/dist-server/server/libs/bcryptjs')

const enabled = process.env.STARTOS_INTEGRATIONS_ENABLED === 'true'
const statePath = process.env.STARTOS_INTEGRATION_STATE_PATH
const keyPath = process.env.STARTOS_PUBLIC_API_KEY_PATH
const password = process.env.STARTOS_INTEGRATION_PASSWORD
delete process.env.STARTOS_INTEGRATION_PASSWORD

async function readOptional(path) {
  try {
    return await fs.readFile(path, 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

async function writeAtomic(path, contents, mode) {
  const temporary = `${path}.tmp`
  await fs.writeFile(temporary, contents, { mode })
  await fs.rename(temporary, path)
}

async function clearKey() {
  await fs.rm(keyPath, { force: true })
}

async function findIntegrationUser(state) {
  const user = await Database.userModel.findByPk(state.userId)
  if (user?.type === 'root')
    throw new Error('Integration identity cannot be root')
  return user
}

async function reconcile() {
  const serialized = await readOptional(statePath)
  let state = serialized && JSON.parse(serialized)
  if (!enabled) {
    await clearKey()
    if (!state) return
    const user = await findIntegrationUser(state)
    if (user) await user.update({ isActive: false })
    const keys = await Database.apiKeyModel.findAll({
      where: { userId: state.userId },
    })
    for (const key of keys) await key.destroy()
    if (state.provisioned || keys.length) {
      state.provisioned = false
      state.keyId = randomUUID()
      await writeAtomic(statePath, JSON.stringify(state), 0o600)
    }
    return
  }
  const root = await Database.userModel.findOne({ where: { type: 'root' } })
  if (!root) {
    await clearKey()
    return
  }
  if (!state) {
    state = { userId: randomUUID(), keyId: randomUUID() }
    await writeAtomic(statePath, JSON.stringify(state), 0o600)
  }

  // This non-root admin identity is package-owned; scans require the admin role.
  const username = `startos-integrations-${state.userId}`
  const permissions = {
    ...Database.userModel.getDefaultPermissionsForUserType('admin'),
    download: false,
    update: false,
    delete: false,
    upload: false,
    createEreader: false,
  }
  let user = await findIntegrationUser(state)
  let key = await Database.apiKeyModel.findByPk(state.keyId)
  if (
    (state.provisioned && !key) ||
    (key && !key.isActive) ||
    (user && !user.isActive)
  ) {
    state.keyId = randomUUID()
    key = null
    await writeAtomic(statePath, JSON.stringify(state), 0o600)
  }
  const obsoleteKeys = await Database.apiKeyModel.findAll({
    where: { userId: state.userId },
  })
  for (const previousKey of obsoleteKeys) {
    if (previousKey.id !== state.keyId) await previousKey.destroy()
  }
  if (!user) {
    if (!password) throw new Error('Missing generated integration password')
    user = await Database.userModel.create({
      id: state.userId,
      username,
      type: 'admin',
      pash: bcrypt.hashSync(password, 8),
      token: null,
      isActive: true,
      permissions,
      bookmarks: [],
      extraData: { seriesHideFromContinueListening: [] },
    })
  } else {
    await user.update({ username, type: 'admin', isActive: true, permissions })
  }
  const name = 'StartOS Service Integrations'
  if (!key) {
    key = await Database.apiKeyModel.create({
      id: state.keyId,
      name,
      userId: user.id,
      createdByUserId: root.id,
      isActive: true,
      expiresAt: null,
    })
  } else {
    await key.update({ name, userId: user.id, isActive: true, expiresAt: null })
  }
  state.provisioned = true
  await writeAtomic(statePath, JSON.stringify(state), 0o600)
  const previous = await readOptional(keyPath)
  if (previous) {
    try {
      const payload = jwt.verify(previous.trim(), TokenManager.TokenSecret)
      if (payload.type === 'api' && payload.keyId === key.id && !payload.exp)
        return
    } catch {}
  }
  // Export the managed API key, never a user's legacy token.
  const token = await Database.apiKeyModel.generateApiKey(
    TokenManager.TokenSecret,
    key.id,
    key.name,
  )
  if (!token) throw new Error('Failed to generate integration API key')
  await writeAtomic(keyPath, `${token}\n`, 0o644)
}

async function reconcileSafely() {
  try {
    await reconcile()
  } catch (error) {
    await clearKey()
    console.error(`StartOS integration provisioning failed: ${error.message}`)
  }
}

// Use the application's existing models/pool; never open a second database writer.
const initTokenSecret = TokenManager.prototype.initTokenSecret
TokenManager.prototype.initTokenSecret = async function (...args) {
  await initTokenSecret.apply(this, args)
  Database.userModel.addHook(
    'afterCreate',
    'startos-integrations',
    async (user, options) => {
      if (user.type !== 'root') return
      if (options.transaction) options.transaction.afterCommit(reconcileSafely)
      else await reconcileSafely()
    },
  )
  await reconcileSafely()
}
