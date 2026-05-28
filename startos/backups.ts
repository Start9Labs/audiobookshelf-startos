import { sdk } from './sdk'

export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.ofVolumes('config', 'metadata', 'audiobooks', 'podcasts'),
)
