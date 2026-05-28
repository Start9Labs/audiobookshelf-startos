import { manifest as filebrowserManifest } from 'filebrowser-startos/startos/manifest'
import { manifest as nextcloudManifest } from 'nextcloud-startos/startos/manifest'
import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  audiobooksPath,
  configPath,
  metadataPath,
  podcastsPath,
  uiPort,
} from './utils'

const statusScript = `require('http').get('http://127.0.0.1:${uiPort}/status',function(r){var d='';r.on('data',function(c){d+=c});r.on('end',function(){try{process.stdout.write(JSON.parse(d).isInit?'INIT':'NOINIT')}catch(e){process.stdout.write('NOINIT')}process.exit(0)})}).on('error',function(){process.exit(1)})`

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Audiobookshelf!'))

  const externalLibraries =
    (await storeJson.read((s) => s.externalLibraries).const(effects)) ?? []

  let mounts = sdk.Mounts.of()
    .mountVolume({
      volumeId: 'config',
      subpath: null,
      mountpoint: configPath,
      readonly: false,
    })
    .mountVolume({
      volumeId: 'metadata',
      subpath: null,
      mountpoint: metadataPath,
      readonly: false,
    })
    .mountVolume({
      volumeId: 'audiobooks',
      subpath: null,
      mountpoint: audiobooksPath,
      readonly: false,
    })
    .mountVolume({
      volumeId: 'podcasts',
      subpath: null,
      mountpoint: podcastsPath,
      readonly: false,
    })

  if (externalLibraries.includes('filebrowser')) {
    mounts = mounts.mountDependency<typeof filebrowserManifest>({
      dependencyId: 'filebrowser',
      volumeId: 'data',
      subpath: null,
      mountpoint: '/mnt/filebrowser',
      readonly: true,
    })
  }

  if (externalLibraries.includes('nextcloud')) {
    mounts = mounts.mountDependency<typeof nextcloudManifest>({
      dependencyId: 'nextcloud',
      volumeId: 'nextcloud',
      subpath: null,
      mountpoint: '/mnt/nextcloud',
      readonly: true,
    })
  }

  const subcontainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'audiobookshelf' },
    mounts,
    'audiobookshelf-sub',
  )

  return sdk.Daemons.of(effects)
    .addDaemon('primary', {
      subcontainer,
      exec: {
        command: sdk.useEntrypoint(),
        env: {
          PORT: String(uiPort),
          CONFIG_PATH: configPath,
          METADATA_PATH: metadataPath,
        },
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkWebUrl(
            effects,
            `http://localhost:${uiPort}/healthcheck`,
            {
              successMessage: i18n('The web interface is ready'),
              errorMessage: i18n('The web interface is not ready'),
            },
          ),
      },
      requires: [],
    })
    .addHealthCheck('initial-setup', {
      ready: {
        display: i18n('Initial Setup'),
        fn: async () => {
          const res = await subcontainer.exec(['node', '-e', statusScript])
          if (res.exitCode !== 0) {
            return {
              result: 'starting',
              message: i18n('Waiting for the server to respond'),
            }
          }
          const out =
            (typeof res.stdout === 'string'
              ? res.stdout
              : res.stdout?.toString('utf8')) ?? ''
          return out.trim() === 'INIT'
            ? { result: 'success', message: i18n('Setup complete') }
            : {
                result: 'loading',
                message: i18n('Open the Web UI to create your admin account'),
              }
        },
      },
      requires: ['primary'],
    })
})
