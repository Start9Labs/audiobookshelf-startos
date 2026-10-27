import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.looseObject({
  externalLibraries: z
    .array(z.enum(['nextexplorer', 'filebrowser', 'nextcloud']))
    .catch([]),
  nextexplorerSubfolder: z.string().nullable().catch(null),
  filebrowserSubfolder: z.string().nullable().catch(null),
  nextcloudSubfolder: z.string().nullable().catch(null),
})

export const storeJson = FileHelper.json(
  {
    base: sdk.volumes.config,
    subpath: '/store.json',
  },
  shape,
)

export type StoreType = z.infer<typeof shape>
