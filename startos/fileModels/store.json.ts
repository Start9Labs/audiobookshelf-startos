import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const library = z
  .looseObject({
    selection: z.enum(['disabled', 'enabled']),
    value: z.looseObject({ subfolder: z.string().nullable().catch(null) }),
  })
  // merge mutates what it parses, so each fallback must be a fresh object
  .catch(() => ({ selection: 'disabled' as const, value: { subfolder: null } }))

const shape = z.looseObject({
  nextexplorer: library,
  filebrowser: library,
  nextcloud: library,
})

export const libraries = shape.keyof().options

export type Library = (typeof libraries)[number]

export const storeJson = FileHelper.json(
  {
    base: sdk.volumes.config,
    subpath: '/store.json',
  },
  shape,
)
