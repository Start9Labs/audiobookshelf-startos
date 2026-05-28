import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.35.0:0',
  releaseNotes: {
    en_US: 'Initial release of Audiobookshelf on StartOS.',
    es_ES: 'Versión inicial de Audiobookshelf en StartOS.',
    de_DE: 'Erstveröffentlichung von Audiobookshelf auf StartOS.',
    pl_PL: 'Pierwsze wydanie Audiobookshelf na StartOS.',
    fr_FR: 'Première version d’Audiobookshelf sur StartOS.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
