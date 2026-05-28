import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  backupMedia: Value.toggle({
    name: i18n('Back Up Media'),
    default: false,
  }),
})

export const backupMedia = sdk.Action.withInput(
  // id
  'backup-media',

  // metadata
  async ({ effects }) => ({
    name: i18n('Include media stored in Audiobookshelf in backups'),
    description: i18n(
      'When enabled, audiobooks and podcasts stored directly in Audiobookshelf are included in StartOS backups. Leave this off if your media comes from File Browser or Nextcloud, or if your library is too large to back up.',
    ),
    warning: i18n(
      'Audiobook and podcast libraries can be very large. Backups may take significant time and storage.',
    ),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => ({
    backupMedia: (await storeJson.read((s) => s.backupMedia).once()) ?? false,
  }),

  // the execution function
  async ({ effects, input }) =>
    storeJson.merge(effects, { backupMedia: input.backupMedia }),
)
