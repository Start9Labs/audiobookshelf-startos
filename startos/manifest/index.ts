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
      // Built from ./Dockerfile (FROM ghcr.io/advplyr/audiobookshelf:2.35.1) to
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
        title: 'File Browser',
        icon: 'https://raw.githubusercontent.com/Start9Labs/filebrowser-startos/fbf1fefb51cca9731f2a9a9e6f790ca150aa9d04/icon.svg',
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
