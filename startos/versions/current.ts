import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.0.0:7',
  releaseNotes: {
    en_US: 'Bumps start-sdk → 1.5.3.',
    es_ES: 'Actualiza start-sdk → 1.5.3.',
    de_DE: 'Aktualisiert start-sdk → 1.5.3.',
    pl_PL: 'Aktualizuje start-sdk → 1.5.3.',
    fr_FR: 'Met à jour start-sdk → 1.5.3.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
