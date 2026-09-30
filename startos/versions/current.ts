import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.37.1:0',
  releaseNotes: {
    en_US:
      'Updated Audiobookshelf to 2.37.1. API keys can now authenticate WebSocket connections. Fixes crashes with invalid filter groups and sorting collapsed sub-series by author, and corrects library access checks for series. Improves OIDC login by cleaning up abandoned mobile login sessions, extending callback cookie expiration to 10 minutes, and redirecting to login when it expires. Includes translation updates. Full release notes: https://github.com/advplyr/audiobookshelf/releases',
    es_ES:
      'Audiobookshelf actualizado a 2.37.1. Las claves API ahora pueden autenticar conexiones WebSocket. Corrige fallos al procesar grupos de filtros no válidos y al ordenar subseries agrupadas por autor, y comprueba que las series pertenezcan a la biblioteca solicitada. Mejora el inicio de sesión OIDC al limpiar las sesiones móviles abandonadas, ampliar la caducidad de la cookie de retorno a 10 minutos y redirigir al inicio de sesión cuando caduca. Incluye actualizaciones de traducciones. Notas de la versión completas: https://github.com/advplyr/audiobookshelf/releases',
    de_DE:
      'Audiobookshelf auf 2.37.1 aktualisiert. API-Schlüssel können jetzt WebSocket-Verbindungen authentifizieren. Behebt Abstürze bei ungültigen Filtergruppen und beim Sortieren eingeklappter Unterserien nach Autor sowie fehlerhafte Bibliotheksprüfungen für Serien. Verbessert die OIDC-Anmeldung durch Bereinigung abgebrochener mobiler Anmeldungen, eine auf 10 Minuten verlängerte Gültigkeit des Callback-Cookies und eine Weiterleitung zur Anmeldung bei Ablauf. Enthält aktualisierte Übersetzungen. Vollständige Versionshinweise: https://github.com/advplyr/audiobookshelf/releases',
    pl_PL:
      'Zaktualizowano Audiobookshelf do 2.37.1. Klucze API mogą teraz uwierzytelniać połączenia WebSocket. Naprawiono awarie przy nieprawidłowych grupach filtrów i sortowaniu zwiniętych podserii według autora oraz sprawdzanie przynależności serii do biblioteki. Ulepszono logowanie OIDC: usuwanie porzuconych mobilnych sesji logowania, wydłużenie ważności ciasteczka zwrotnego do 10 minut i przekierowanie do logowania po jego wygaśnięciu. Zaktualizowano tłumaczenia. Pełne informacje o wydaniu: https://github.com/advplyr/audiobookshelf/releases',
    fr_FR:
      'Audiobookshelf mis à jour vers 2.37.1. Les clés API peuvent désormais authentifier les connexions WebSocket. Corrige les plantages avec des groupes de filtres invalides et lors du tri des sous-séries repliées par auteur, ainsi que la vérification de la bibliothèque des séries. Améliore la connexion OIDC en nettoyant les sessions mobiles abandonnées, en prolongeant la validité du cookie de retour à 10 minutes et en redirigeant vers la connexion à son expiration. Inclut des traductions mises à jour. Notes de version complètes : https://github.com/advplyr/audiobookshelf/releases',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
