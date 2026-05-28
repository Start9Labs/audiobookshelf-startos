import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  mediaSources: z.array(z.enum(['filebrowser', 'nextcloud'])).catch([]),
  backupMedia: z.boolean().catch(false),
})

export const storeJson = FileHelper.json(
  {
    base: sdk.volumes.config,
    subpath: '/store.json',
  },
  shape,
)

export type StoreType = z.infer<typeof shape>
