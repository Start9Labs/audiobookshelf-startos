import { FileHelper } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { publicApiKeyFile } from '../utils'

export const serviceIntegrations = sdk.Action.withInput(
  'service-integrations',
  {
    name: i18n('Service Integrations'),
    description: i18n(
      'Automatically provide a dedicated API credential to connected StartOS services. Library scans require administrator access. The package owns this non-root account and key; manage their access here, not in the web app. Changes restart Audiobookshelf.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },
  sdk.InputSpec.of({
    integrationsEnabled: sdk.Value.toggle({
      name: i18n('Enable Service Integrations'),
      default: false,
    }),
  }),
  async () =>
    storeJson
      .read((s) => ({ integrationsEnabled: s.integrationsEnabled }))
      .once(),
  async ({ effects, input }) => {
    if (!input.integrationsEnabled)
      await FileHelper.string({
        base: sdk.volumes.public,
        subpath: publicApiKeyFile,
      }).write(effects, '')
    await storeJson.merge(effects, input)
  },
)
