import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  mediaSources: Value.multiselect({
    name: i18n('External Libraries'),
    values: {
      filebrowser: i18n('File Browser'),
      nextcloud: i18n('Nextcloud'),
    },
    default: [],
  }),
})

export const mediaSources = sdk.Action.withInput(
  // id
  'media-sources',

  // metadata
  async ({ effects }) => ({
    name: i18n('External Libraries'),
    description: i18n(
      'Connect File Browser or Nextcloud as read-only external libraries. Audiobookshelf can scan and play media stored there but cannot modify it. Uploads and podcast downloads always go to the libraries managed by Audiobookshelf.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => ({
    mediaSources: (await storeJson.read((s) => s.mediaSources).once()) ?? [],
  }),

  // the execution function
  async ({ effects, input }) =>
    storeJson.merge(effects, { mediaSources: input.mediaSources }),
)
