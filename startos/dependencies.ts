import { T } from '@start9labs/start-sdk'
import { storeJson } from './fileModels/store.json'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const externalLibraries =
    (await storeJson.read((s) => s.externalLibraries).const(effects)) ?? []

  const deps: T.CurrentDependenciesResult<any> = {}

  if (externalLibraries.includes('filebrowser')) {
    deps['filebrowser'] = {
      kind: 'exists',
      versionRange: '>=2.63.17:1',
    }
  }

  if (externalLibraries.includes('nextcloud')) {
    deps['nextcloud'] = {
      kind: 'exists',
      versionRange: '>=33.0.6:0',
    }
  }

  return deps
})
