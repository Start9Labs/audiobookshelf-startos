import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.35.1:0',
  releaseNotes: {
    en_US: 'Updates Audiobookshelf to 2.35.1.',
    es_ES: 'Actualiza Audiobookshelf a 2.35.1.',
    de_DE: 'Aktualisiert Audiobookshelf auf 2.35.1.',
    pl_PL: 'Aktualizuje Audiobookshelf do 2.35.1.',
    fr_FR: 'Met à jour Audiobookshelf vers 2.35.1.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
