import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const library = z
  .looseObject({
    selection: z.enum(['disabled', 'enabled']),
    value: z.looseObject({ subfolder: z.string().nullable().catch(null) }),
  })
  // merge mutates what it parses, so each fallback must be a fresh object
  .catch(() => ({ selection: 'disabled' as const, value: { subfolder: null } }))

const libraryShape = z.looseObject({
  nextexplorer: library,
  filebrowser: library,
  nextcloud: library,
})

const shape = libraryShape.extend({
  integrationsEnabled: z.boolean().catch(false),
})

export const libraries = libraryShape.keyof().options

export type Library = (typeof libraries)[number]

export const storeJson = FileHelper.json(
  {
    base: sdk.volumes.config,
    subpath: '/store.json',
  },
  shape,
)
