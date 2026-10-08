import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

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
      // Built from ./Dockerfile (FROM ghcr.io/advplyr/audiobookshelf:2.37.1) to
      // strip the web client's third-party phone-homes. See the Dockerfile and
      // UPDATING.md; bump the FROM tag there in lockstep with the version below.
      source: { dockerBuild: {} },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
