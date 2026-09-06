import { setupManifest } from '@start9labs/start-sdk'
import {
  filebrowserDescription,
  long,
  nextcloudDescription,
  short,
} from './i18n'

export const manifest = setupManifest({
  id: 'audiobookshelf',
  title: 'Audiobookshelf',
  license: 'GPL-3.0',
  packageRepo: 'https://github.com/Start9Labs/audiobookshelf-startos',
  upstreamRepo: 'https://github.com/advplyr/audiobookshelf',
  marketingUrl: 'https://www.audiobookshelf.org/',
  donationUrl: null,
  description: { short, long },
  volumes: ['config', 'metadata', 'audiobooks', 'podcasts'],
  images: {
    audiobookshelf: {
      // Built from ./Dockerfile (FROM ghcr.io/advplyr/audiobookshelf:2.36.0) to
      // strip the web client's third-party phone-homes. See the Dockerfile and
      // UPDATING.md; bump the FROM tag there in lockstep with the version below.
      source: { dockerBuild: {} },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {
    filebrowser: {
      description: filebrowserDescription,
      optional: true,
      metadata: {
        title: 'FileBrowser Quantum',
        icon: 'https://raw.githubusercontent.com/Start9Labs/filebrowser-quantum-startos/e936a6c85a97b930b43cad5e9c0dd4898a2df567/icon.svg',
      },
    },
    nextcloud: {
      description: nextcloudDescription,
      optional: true,
      metadata: {
        title: 'Nextcloud',
        icon: 'https://raw.githubusercontent.com/Start9Labs/nextcloud-startos/f5025c524301aebe62d9a79ad720223b053e1bf2/icon.svg',
      },
    },
  },
})
