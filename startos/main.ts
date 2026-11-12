import { utils } from '@start9labs/start-sdk'
import { libraries, storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  audiobooksPath,
  canMount,
  configPath,
  libraryTitles,
  integrationStatePath,
  integrationStatusScript,
  metadataPath,
  mountLibrary,
  outsideNextcloudData,
  passwordOpts,
  podcastsPath,
  publicApiKeyPath,
  publicPath,
  uiPort,
} from './utils'

const statusScript = `require('http').get('http://127.0.0.1:${uiPort}/status',function(r){var d='';r.on('data',function(c){d+=c});r.on('end',function(){try{process.stdout.write(JSON.parse(d).isInit?'INIT':'NOINIT')}catch(e){process.stdout.write('NOINIT')}process.exit(0)})}).on('error',function(){process.exit(1)})`

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Audiobookshelf!'))

  const store = await storeJson.read().const(effects)

  let mounts = sdk.Mounts.of()
    .mountAssets({ subpath: null, mountpoint: '/assets', type: 'directory' })
    .mountVolume({
      volumeId: 'public',
      subpath: null,
      mountpoint: publicPath,
      readonly: false,
    })
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

  const unmounted: string[] = []
  for (const library of libraries) {
    const settings = store?.[library]
    if (settings?.selection !== 'enabled') continue
    const subfolder = settings.value.subfolder || null
    if (subfolder && outsideNextcloudData(library, subfolder)) {
      unmounted.push(
        i18n(
          'The folder "${subfolder}" is outside Nextcloud\'s data folder, so it is not mounted. Change it in External Libraries to a folder that starts with data/.',
          { subfolder },
        ),
      )
    } else if (await canMount(effects, library, subfolder)) {
      mounts = mountLibrary(mounts, library, subfolder)
    } else {
      unmounted.push(
        subfolder && (await canMount(effects, library, null))
          ? i18n(
              'The folder "${subfolder}" was not found in ${library}, so it is not mounted. Create it there and restart Audiobookshelf, or change it in External Libraries.',
              { subfolder, library: libraryTitles[library] },
            )
          : i18n(
              '${library} is not installed, so it is not mounted. Install it and restart Audiobookshelf, or disable it in External Libraries.',
              { library: libraryTitles[library] },
            ),
      )
    }
  }

  const subcontainer = sdk.SubContainer.of(
    effects,
    { imageId: 'audiobookshelf' },
    mounts,
    'audiobookshelf-sub',
  )

  return sdk.Daemons.of(effects)
    .addDaemon('primary', {
      subcontainer,
      exec: {
        command: sdk.useEntrypoint([
          'node',
          '--require',
          '/assets/integrations.cjs',
          'dist-server/index.js',
        ]),
        env: {
          PORT: String(uiPort),
          CONFIG_PATH: configPath,
          METADATA_PATH: metadataPath,
          STARTOS_INTEGRATIONS_ENABLED: String(
            store?.integrationsEnabled ?? false,
          ),
          STARTOS_INTEGRATION_STATE_PATH: integrationStatePath,
          STARTOS_PUBLIC_API_KEY_PATH: publicApiKeyPath,
          STARTOS_INTEGRATION_PASSWORD: utils.getDefaultString(passwordOpts),
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
    .addHealthCheck('integrations', () =>
      store?.integrationsEnabled
        ? {
            ready: {
              display: i18n('Service Integrations'),
              fn: async () => {
                const result = await subcontainer.exec([
                  'node',
                  '-e',
                  integrationStatusScript,
                  publicApiKeyPath,
                  String(uiPort),
                ])
                return result.exitCode === 0
                  ? {
                      result: 'success',
                      message: i18n('The integration API credential is ready'),
                    }
                  : result.exitCode === 2
                    ? {
                        result: 'loading',
                        message: i18n(
                          'Complete initial setup in the Web UI. Check service logs if the integration credential remains unavailable.',
                        ),
                      }
                    : {
                        result: 'failure',
                        message: i18n(
                          'The integration API credential is not working. Check service logs and restart Audiobookshelf.',
                        ),
                      }
              },
            },
            requires: ['primary'],
          }
        : null,
    )
    .addHealthCheck('external-libraries', () =>
      unmounted.length
        ? {
            ready: {
              display: i18n('External Libraries'),
              gracePeriod: 0,
              trigger: sdk.trigger.onceTrigger,
              fn: () => ({ result: 'failure', message: unmounted.join(' ') }),
            },
            requires: [],
          }
        : null,
    )
})
