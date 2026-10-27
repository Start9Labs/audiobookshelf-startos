import { T } from '@start9labs/start-sdk'
import { manifest as filebrowserManifest } from 'filebrowser-startos/startos/manifest'
import { manifest as nextcloudManifest } from 'nextcloud-startos/startos/manifest'
import { manifest as nextexplorerManifest } from 'nextexplorer-startos/startos/manifest'
import { Library } from './fileModels/store.json'
import { i18n } from './i18n'
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

export const libraryTitles = {
  nextexplorer: i18n('NextExplorer'),
  filebrowser: i18n('FileBrowser Quantum'),
  nextcloud: i18n('Nextcloud'),
}

export const mountLibrary = (
  mounts: ReturnType<typeof sdk.Mounts.of>,
  library: Library,
  subpath: string | null,
) => {
  const mountpoint = subpath ? `/mnt/${library}/${subpath}` : `/mnt/${library}`
  switch (library) {
    case 'nextexplorer':
      return mounts.mountDependency<typeof nextexplorerManifest>({
        dependencyId: 'nextexplorer',
        volumeId: 'data',
        subpath,
        mountpoint,
        readonly: true,
      })
    case 'filebrowser':
      return mounts.mountDependency<typeof filebrowserManifest>({
        dependencyId: 'filebrowser',
        volumeId: 'data',
        subpath,
        mountpoint,
        readonly: true,
      })
    case 'nextcloud':
      return mounts.mountDependency<typeof nextcloudManifest>({
        dependencyId: 'nextcloud',
        volumeId: 'nextcloud',
        subpath,
        mountpoint,
        readonly: true,
      })
  }
}

export const canMount = (
  effects: T.Effects,
  library: Library,
  subpath: string | null,
) =>
  sdk.SubContainer.withTemp(
    effects,
    { imageId: 'audiobookshelf' },
    mountLibrary(sdk.Mounts.of(), library, subpath),
    'check-mount',
    async () => true,
  ).catch((e) => {
    console.warn(e)
    return false
  })
