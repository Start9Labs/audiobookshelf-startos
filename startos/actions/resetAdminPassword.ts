import { utils } from '@start9labs/start-sdk'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { configMounts, dbPath, passwordOpts } from '../utils'

export const resetAdminPassword = sdk.Action.withoutInput(
  // id
  'reset-admin-password',

  // metadata
  async ({ effects }) => ({
    name: i18n('Reset Admin Password'),
    description: i18n(
      'Generate a new random password for the root admin account. Use this if you are locked out of the web interface.',
    ),
    warning: i18n(
      'This replaces the current root account password with a new random one.',
    ),
    allowedStatuses: 'only-stopped',
    group: null,
    visibility: 'enabled',
  }),

  // the execution function
  async ({ effects }) => {
    const password = utils.getDefaultString(passwordOpts)
    let username = 'root'

    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'audiobookshelf' },
      configMounts,
      'reset-admin',
      async (sub) => {
        const script = `const bcrypt=require('/app/server/libs/bcryptjs');const sqlite3=require('/app/node_modules/sqlite3');const hash=bcrypt.hashSync('${password}',8);const db=new sqlite3.Database('${dbPath}');db.get("SELECT username FROM users WHERE type='root' LIMIT 1",function(e,row){if(e){console.error('ERR '+e.message);process.exit(3)}if(!row){console.error('NOROOT');process.exit(2)}db.run("UPDATE users SET pash=?, isActive=1, isLocked=0 WHERE type='root'",[hash],function(e2){if(e2){console.error('ERR '+e2.message);process.exit(3)}process.stdout.write('USER:'+row.username);db.close(function(){process.exit(0)})})})`

        const res = await sub.exec(['node', '-e', script])

        if (res.exitCode === 2) {
          throw new Error(
            'No root admin account exists yet. Open the web interface and create your account first.',
          )
        }
        if (res.exitCode !== 0) {
          const err =
            (typeof res.stderr === 'string'
              ? res.stderr
              : res.stderr?.toString('utf8')) ?? ''
          throw new Error(`Failed to reset admin password: ${err}`)
        }

        const out =
          (typeof res.stdout === 'string'
            ? res.stdout
            : res.stdout?.toString('utf8')) ?? ''
        username = out.replace(/^USER:/, '').trim() || 'root'
      },
    )

    return {
      version: '1',
      title: i18n('Admin Password Reset'),
      message: i18n(
        'Your root admin password has been reset. Save these credentials in a password manager.',
      ),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Username'),
            description: null,
            value: username,
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
