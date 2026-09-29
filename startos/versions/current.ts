import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.37.0:0',
  releaseNotes: {
    en_US:
      'Updated Audiobookshelf to 2.37.0. API keys can now authenticate WebSocket connections. Fixes crashes with invalid filter groups and sorting collapsed sub-series by author, and corrects library access checks for series. Full release notes: https://github.com/advplyr/audiobookshelf/releases/tag/v2.37.0',
    es_ES:
      'Audiobookshelf actualizado a 2.37.0. Las claves API ahora pueden autenticar conexiones WebSocket. Corrige fallos al procesar grupos de filtros no válidos y al ordenar subseries agrupadas por autor, y comprueba que las series pertenezcan a la biblioteca solicitada. Notas de la versión completas: https://github.com/advplyr/audiobookshelf/releases/tag/v2.37.0',
    de_DE:
      'Audiobookshelf auf 2.37.0 aktualisiert. API-Schlüssel können jetzt WebSocket-Verbindungen authentifizieren. Behebt Abstürze bei ungültigen Filtergruppen und beim Sortieren eingeklappter Unterserien nach Autor sowie fehlerhafte Bibliotheksprüfungen für Serien. Vollständige Versionshinweise: https://github.com/advplyr/audiobookshelf/releases/tag/v2.37.0',
    pl_PL:
      'Zaktualizowano Audiobookshelf do 2.37.0. Klucze API mogą teraz uwierzytelniać połączenia WebSocket. Naprawiono awarie przy nieprawidłowych grupach filtrów i sortowaniu zwiniętych podserii według autora oraz sprawdzanie przynależności serii do biblioteki. Pełne informacje o wydaniu: https://github.com/advplyr/audiobookshelf/releases/tag/v2.37.0',
    fr_FR:
      'Audiobookshelf mis à jour vers 2.37.0. Les clés API peuvent désormais authentifier les connexions WebSocket. Corrige les plantages avec des groupes de filtres invalides et lors du tri des sous-séries repliées par auteur, ainsi que la vérification de la bibliothèque des séries. Notes de version complètes : https://github.com/advplyr/audiobookshelf/releases/tag/v2.37.0',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
