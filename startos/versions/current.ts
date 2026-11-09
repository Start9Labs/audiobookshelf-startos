import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.37.2:2',
  releaseNotes: {
    en_US:
      "Requires StartOS 0.4.1 or later. Audiobookshelf now sees only Nextcloud's user files, not its configuration; a Nextcloud subfolder must start with data/.",
    es_ES:
      'Requiere StartOS 0.4.1 o posterior. Audiobookshelf ahora solo ve los archivos de usuario de Nextcloud, no su configuración; una subcarpeta de Nextcloud debe empezar por data/.',
    de_DE:
      'Erfordert StartOS 0.4.1 oder neuer. Audiobookshelf sieht jetzt nur noch die Benutzerdateien von Nextcloud, nicht dessen Konfiguration; ein Nextcloud-Unterordner muss mit data/ beginnen.',
    pl_PL:
      'Wymaga StartOS 0.4.1 lub nowszego. Audiobookshelf widzi teraz tylko pliki użytkowników Nextcloud, a nie jego konfigurację; podfolder Nextcloud musi zaczynać się od data/.',
    fr_FR:
      'Nécessite StartOS 0.4.1 ou une version ultérieure. Audiobookshelf ne voit désormais que les fichiers utilisateur de Nextcloud, et non sa configuration ; un sous-dossier Nextcloud doit commencer par data/.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
