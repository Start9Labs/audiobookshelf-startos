import { sdk } from './sdk'

export const uiPort = 80
export const configPath = '/config'
export const metadataPath = '/metadata'
export const audiobooksPath = '/audiobooks'
export const podcastsPath = '/podcasts'
export const dbPath = `${configPath}/absdatabase.sqlite`

export const passwordOpts = { charset: 'a-z,A-Z,0-9', len: 24 }

export const configMounts = sdk.Mounts.of().mountVolume({
  volumeId: 'config',
  subpath: null,
  mountpoint: configPath,
  readonly: false,
})
