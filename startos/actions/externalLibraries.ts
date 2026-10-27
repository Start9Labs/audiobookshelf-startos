import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { canMount, libraryTitles } from '../utils'

const { InputSpec, Value } = sdk

const subfolderPatterns = [
  {
    regex: '^(?!/)(?!(.*/)?\\.\\.(/|$)).*$',
    description: i18n(
      'Must be a relative path, such as Audiobooks, with no leading / and no .. segments',
    ),
  },
]

export const inputSpec = InputSpec.of({
  externalLibraries: Value.multiselect({
    name: i18n('External Libraries'),
    description: i18n(
      '- NextExplorer: its storage appears at /mnt/nextexplorer, one folder per location\n- FileBrowser Quantum: its storage appears at /mnt/filebrowser\n- Nextcloud: its storage appears at /mnt/nextcloud, with one folder per account under /mnt/nextcloud/data',
    ),
    values: libraryTitles,
    default: [],
  }),
  nextexplorerSubfolder: Value.text({
    name: i18n('NextExplorer Subfolder'),
    description: i18n(
      "Mount only this folder, starting with its location, e.g. Files/Audiobooks, which then appears at /mnt/nextexplorer/Files/Audiobooks. Leave empty to mount all of NextExplorer's storage.",
    ),
    required: false,
    default: null,
    placeholder: 'Files/Audiobooks',
    patterns: subfolderPatterns,
  }),
  filebrowserSubfolder: Value.text({
    name: i18n('FileBrowser Quantum Subfolder'),
    description: i18n(
      "Mount only this folder, e.g. Audiobooks, which then appears at /mnt/filebrowser/Audiobooks. Leave empty to mount all of FileBrowser Quantum's storage.",
    ),
    required: false,
    default: null,
    placeholder: 'Audiobooks',
    patterns: subfolderPatterns,
  }),
  nextcloudSubfolder: Value.text({
    name: i18n('Nextcloud Subfolder'),
    description: i18n(
      "Mount only this folder, e.g. data/admin/files/Audiobooks for the account named admin, which then appears at /mnt/nextcloud/data/admin/files/Audiobooks. Leave empty to mount all of Nextcloud's storage, including its configuration.",
    ),
    required: false,
    default: null,
    placeholder: 'data/admin/files/Audiobooks',
    patterns: subfolderPatterns,
  }),
})

export const externalLibraries = sdk.Action.withInput(
  // id
  'external-libraries',

  // metadata
  async ({ effects }) => ({
    name: i18n('External Libraries'),
    description: i18n(
      'Connect NextExplorer, FileBrowser Quantum or Nextcloud as read-only external libraries. Audiobookshelf can scan and play media stored there but cannot modify it. Uploads and podcast downloads always go to the libraries managed by Audiobookshelf.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => storeJson.read().once(),

  // the execution function
  async ({ effects, input }) => {
    for (const library of input.externalLibraries) {
      const subfolder = input[`${library}Subfolder` as const]
      if (subfolder && !(await canMount(effects, library, subfolder))) {
        throw new Error(
          i18n(
            'The folder "${subfolder}" was not found in ${library}. Check the path, and that ${library} is installed.',
            { subfolder, library: libraryTitles[library] },
          ),
        )
      }
    }
    await storeJson.merge(effects, input)
  },
)
