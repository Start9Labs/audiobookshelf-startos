import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.36.1:1',
  releaseNotes: {
    en_US: `NextExplorer, the recommended file server, can now be connected as a read-only external library, mounted at /mnt/nextexplorer. Select it under **External Libraries**.

Updated Audiobookshelf to 2.36.1. Includes access-control and input-sanitization fixes, and fixes filtered series collapsing and stale podcast episode updates after a rescan. Full release notes: https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.1`,
    es_ES: `NextExplorer, el servidor de archivos recomendado, ahora puede conectarse como biblioteca externa de solo lectura, montada en /mnt/nextexplorer. Selecciónalo en **Bibliotecas externas**.

Audiobookshelf actualizado a 2.36.1. Incluye correcciones de control de acceso y saneamiento de entradas, y corrige el plegado de series con filtros y las actualizaciones obsoletas de episodios de pódcast tras volver a analizar. Notas de la versión completas: https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.1`,
    de_DE: `NextExplorer, der empfohlene Dateiserver, kann jetzt als schreibgeschützte externe Bibliothek eingebunden werden, unter /mnt/nextexplorer. Wählen Sie ihn unter **Externe Bibliotheken**.

Audiobookshelf auf 2.36.1 aktualisiert. Enthält Korrekturen für Zugriffskontrollen und Eingabebereinigung sowie für das Einklappen gefilterter Serien und veraltete Podcast-Episodenmeldungen nach einem erneuten Scan. Vollständige Versionshinweise: https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.1`,
    pl_PL: `NextExplorer, zalecany serwer plików, można teraz podłączyć jako zewnętrzną bibliotekę tylko do odczytu, zamontowaną w /mnt/nextexplorer. Wybierz go w **Biblioteki zewnętrzne**.

Zaktualizowano Audiobookshelf do 2.36.1. Obejmuje poprawki kontroli dostępu i oczyszczania danych wejściowych oraz naprawia zwijanie serii przy aktywnych filtrach i nieaktualne zdarzenia odcinków podcastów po ponownym skanowaniu. Pełne informacje o wydaniu: https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.1`,
    fr_FR: `NextExplorer, le serveur de fichiers recommandé, peut désormais être connecté comme bibliothèque externe en lecture seule, montée sur /mnt/nextexplorer. Sélectionnez-le dans **Bibliothèques externes**.

Audiobookshelf mis à jour vers 2.36.1. Comprend des correctifs de contrôle d'accès et de nettoyage des entrées, ainsi que des corrections pour le repli des séries avec filtres et les mises à jour obsolètes d'épisodes de podcast après une nouvelle analyse. Notes de version complètes : https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.1`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
