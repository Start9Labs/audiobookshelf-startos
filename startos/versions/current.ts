import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.38.0:0',
  releaseNotes: {
    en_US:
      'Updated Audiobookshelf to 2.38.0. Fixes server crashes during library scans and when saving books with duplicate authors or series, and closes several access-control gaps that let users see or update playback sessions, progress, collections and library events they should not have access to. Full notes: https://github.com/advplyr/audiobookshelf/releases/tag/v2.38.0',
    es_ES:
      'Audiobookshelf actualizado a 2.38.0. Corrige cierres inesperados del servidor al escanear bibliotecas y al guardar libros con autores o series duplicados, y cierra varias brechas de control de acceso que permitían a usuarios ver o modificar sesiones de reproducción, progreso, colecciones y eventos de bibliotecas a los que no deberían tener acceso. Notas completas: https://github.com/advplyr/audiobookshelf/releases/tag/v2.38.0',
    de_DE:
      'Audiobookshelf auf 2.38.0 aktualisiert. Behebt Serverabstürze bei Bibliotheksscans und beim Speichern von Büchern mit doppelten Autoren oder Serien und schließt mehrere Lücken in der Zugriffskontrolle, durch die Benutzer Wiedergabesitzungen, Fortschritt, Sammlungen und Bibliotheksereignisse sehen oder ändern konnten, auf die sie keinen Zugriff haben sollten. Vollständige Hinweise: https://github.com/advplyr/audiobookshelf/releases/tag/v2.38.0',
    pl_PL:
      'Zaktualizowano Audiobookshelf do 2.38.0. Naprawia awarie serwera podczas skanowania bibliotek i zapisywania książek z powtórzonymi autorami lub seriami oraz usuwa kilka luk w kontroli dostępu, przez które użytkownicy mogli widzieć lub zmieniać sesje odtwarzania, postęp, kolekcje i zdarzenia bibliotek, do których nie powinni mieć dostępu. Pełne informacje: https://github.com/advplyr/audiobookshelf/releases/tag/v2.38.0',
    fr_FR:
      'Audiobookshelf mis à jour vers 2.38.0. Corrige des plantages du serveur lors des analyses de bibliothèque et de l’enregistrement de livres avec des auteurs ou séries en double, et comble plusieurs failles de contrôle d’accès qui permettaient à des utilisateurs de voir ou modifier des sessions de lecture, des progressions, des collections et des événements de bibliothèque auxquels ils ne devraient pas avoir accès. Notes complètes : https://github.com/advplyr/audiobookshelf/releases/tag/v2.38.0',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
