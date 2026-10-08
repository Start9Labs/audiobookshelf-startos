import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.37.1:1',
  releaseNotes: {
    en_US: `- External Libraries says where each service's storage appears inside Audiobookshelf.`,
    es_ES: `- Bibliotecas externas indica dónde aparece el almacenamiento de cada servicio dentro de Audiobookshelf.`,
    de_DE: `- „Externe Bibliotheken“ zeigt, wo der Speicher jedes Dienstes in Audiobookshelf erscheint.`,
    pl_PL: `- Biblioteki zewnętrzne podają, gdzie w Audiobookshelf pojawia się magazyn każdej usługi.`,
    fr_FR: `- Bibliothèques externes indique où le stockage de chaque service apparaît dans Audiobookshelf.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
