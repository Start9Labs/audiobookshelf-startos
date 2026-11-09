import { Library, libraries, storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { canMount, libraryTitles, outsideNextcloudData } from '../utils'

const { InputSpec, Value, Variants } = sdk

const libraryUnion = (
  library: Library,
  description: string,
  subfolderDescription: string,
  placeholder: string,
  patterns: { regex: string; description: string }[] = [],
) =>
  Value.union({
    name: libraryTitles[library],
    description,
    default: 'disabled',
    variants: Variants.of({
      disabled: { name: i18n('Disabled'), spec: InputSpec.of({}) },
      enabled: {
        name: i18n('Enabled'),
        spec: InputSpec.of({
          subfolder: Value.text({
            name: i18n('Subfolder'),
            description: subfolderDescription,
            required: false,
            default: null,
            placeholder,
            patterns: [
              {
                regex: '^(?!/)(?!(.*/)?\\.\\.(/|$)).*$',
                description: i18n(
                  'Must be a relative path, such as Audiobooks, with no leading / and no .. segments',
                ),
              },
              ...patterns,
            ],
          }),
        }),
      },
    }),
  })

export const inputSpec = InputSpec.of({
  nextexplorer: libraryUnion(
    'nextexplorer',
    i18n(
      'When enabled, its storage appears at /mnt/nextexplorer, one folder per location.',
    ),
    i18n(
      "Mount only this folder, starting with its location, e.g. Files/Audiobooks, which then appears at /mnt/nextexplorer/Files/Audiobooks. Leave empty to mount all of NextExplorer's storage.",
    ),
    'Files/Audiobooks',
  ),
  filebrowser: libraryUnion(
    'filebrowser',
    i18n('When enabled, its storage appears at /mnt/filebrowser.'),
    i18n(
      "Mount only this folder, e.g. Audiobooks, which then appears at /mnt/filebrowser/Audiobooks. Leave empty to mount all of FileBrowser Quantum's storage.",
    ),
    'Audiobooks',
  ),
  nextcloud: libraryUnion(
    'nextcloud',
    i18n(
      'When enabled, its user files appear at /mnt/nextcloud/data, one folder per account.',
    ),
    i18n(
      "Mount only this folder, e.g. data/admin/files/Audiobooks for the account named admin, which then appears at /mnt/nextcloud/data/admin/files/Audiobooks. It must start with data/. Leave empty to mount every account's files.",
    ),
    'data/admin/files/Audiobooks',
    [
      {
        regex: '^data(/.*)?$',
        description: i18n(
          "Must be inside Nextcloud's data folder, starting with data/, such as data/admin/files/Audiobooks",
        ),
      },
    ],
  ),
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
    for (const library of libraries) {
      const settings = input[library]
      const subfolder =
        settings.selection === 'enabled' && settings.value.subfolder
      if (subfolder && outsideNextcloudData(library, subfolder)) {
        throw new Error(
          i18n(
            "Must be inside Nextcloud's data folder, starting with data/, such as data/admin/files/Audiobooks",
          ),
        )
      }
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
