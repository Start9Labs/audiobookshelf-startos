import { existsSync } from 'node:fs'
import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'

const audiobooksData = '/media/startos/volumes/audiobooks/'
const audiobooksBackup = '/media/startos/backup/volumes/audiobooks/'
const podcastsData = '/media/startos/volumes/podcasts/'
const podcastsBackup = '/media/startos/backup/volumes/podcasts/'

export const { createBackup, restoreInit } = sdk.setupBackups(async () => {
  const store = await storeJson.read().once()

  // On restore the config volume (which holds the opt-in flag) is not restored
  // yet, so `store` is null here — fall back to whether the archive holds media.
  const includeMedia =
    store === null
      ? existsSync(audiobooksBackup) || existsSync(podcastsBackup)
      : store.backupMedia

  let backups = sdk.Backups.ofVolumes('config', 'metadata')

  if (includeMedia) {
    backups = backups
      .addSync({ dataPath: audiobooksData, backupPath: audiobooksBackup })
      .addSync({ dataPath: podcastsData, backupPath: podcastsBackup })
  }

  return backups
})
