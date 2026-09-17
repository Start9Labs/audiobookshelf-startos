import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.36.1:0',
  releaseNotes: {
    en_US:
      'Updated Audiobookshelf to 2.36.1. Includes access-control and input-sanitization fixes, and fixes filtered series collapsing and stale podcast episode updates after a rescan. Full release notes: https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.1',
    es_ES:
      'Audiobookshelf actualizado a 2.36.1. Incluye correcciones de control de acceso y saneamiento de entradas, y corrige el plegado de series con filtros y las actualizaciones obsoletas de episodios de pódcast tras volver a analizar. Notas de la versión completas: https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.1',
    de_DE:
      'Audiobookshelf auf 2.36.1 aktualisiert. Enthält Korrekturen für Zugriffskontrollen und Eingabebereinigung sowie für das Einklappen gefilterter Serien und veraltete Podcast-Episodenmeldungen nach einem erneuten Scan. Vollständige Versionshinweise: https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.1',
    pl_PL:
      'Zaktualizowano Audiobookshelf do 2.36.1. Obejmuje poprawki kontroli dostępu i oczyszczania danych wejściowych oraz naprawia zwijanie serii przy aktywnych filtrach i nieaktualne zdarzenia odcinków podcastów po ponownym skanowaniu. Pełne informacje o wydaniu: https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.1',
    fr_FR:
      "Audiobookshelf mis à jour vers 2.36.1. Comprend des correctifs de contrôle d'accès et de nettoyage des entrées, ainsi que des corrections pour le repli des séries avec filtres et les mises à jour obsolètes d'épisodes de podcast après une nouvelle analyse. Notes de version complètes : https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.1",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
