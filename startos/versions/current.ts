import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.37.2:0',
  releaseNotes: {
    en_US:
      'Updated Audiobookshelf to 2.37.2. Includes the October 2026 Node.js security fixes. Fixes file copy and move failing with EPERM on some systems, RSS feed covers not updating after a cover change, Audible searches that return no products, and uploads that repeat file fields. Full release notes: https://github.com/advplyr/audiobookshelf/releases',
    es_ES:
      'Audiobookshelf actualizado a 2.37.2. Incluye las correcciones de seguridad de Node.js de octubre de 2026. Corrige los fallos con EPERM al copiar y mover archivos en algunos sistemas, las portadas de los feeds RSS que no se actualizaban tras cambiar la portada, las búsquedas de Audible sin productos y las subidas que repiten campos de archivo. Notas de la versión completas: https://github.com/advplyr/audiobookshelf/releases',
    de_DE:
      'Audiobookshelf auf 2.37.2 aktualisiert. Enthält die Node.js-Sicherheitskorrekturen vom Oktober 2026. Behebt fehlschlagendes Kopieren und Verschieben von Dateien mit EPERM auf manchen Systemen, nach einem Coverwechsel nicht aktualisierte Cover in RSS-Feeds, Audible-Suchen ohne Produkte sowie Uploads mit wiederholten Dateifeldern. Vollständige Versionshinweise: https://github.com/advplyr/audiobookshelf/releases',
    pl_PL:
      'Zaktualizowano Audiobookshelf do 2.37.2. Zawiera poprawki bezpieczeństwa Node.js z października 2026. Naprawiono kopiowanie i przenoszenie plików kończące się błędem EPERM na niektórych systemach, nieaktualizowane okładki w kanałach RSS po zmianie okładki, wyszukiwania w Audible bez produktów oraz przesyłanie z powtórzonymi polami plików. Pełne informacje o wydaniu: https://github.com/advplyr/audiobookshelf/releases',
    fr_FR: `Audiobookshelf mis à jour vers 2.37.2. Inclut les correctifs de sécurité Node.js d'octobre 2026. Corrige l'échec avec EPERM de la copie et du déplacement de fichiers sur certains systèmes, les couvertures des flux RSS non mises à jour après un changement de couverture, les recherches Audible sans produits et les envois qui répètent des champs de fichier. Notes de version complètes : https://github.com/advplyr/audiobookshelf/releases`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
