import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.36.0:0',
  releaseNotes: {
    en_US: `Updated Audiobookshelf to 2.36.0.

- Security fixes: stricter OIDC callback URL validation, per-item access checks on bulk library downloads, refresh tokens are no longer accepted as API or websocket credentials, and the root account can no longer be deleted through the user endpoint.
- Your account page now lists your active sessions, so you can log out of one device or all of them. Changing your password ends every session.
- Fixes a manually matched podcast episode not getting its download URL.
- The Reset Admin Password action now also signs out the root account's existing sessions.

Full release notes: https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.0`,
    es_ES: `Audiobookshelf actualizado a 2.36.0.

- Correcciones de seguridad: validación más estricta de la URL de retorno de OIDC, comprobación de acceso por elemento en las descargas masivas de la biblioteca, los tokens de actualización ya no se aceptan como credenciales de la API ni del websocket, y la cuenta root ya no puede eliminarse mediante el endpoint de usuarios.
- La página de tu cuenta ahora muestra tus sesiones activas, para que puedas cerrar la sesión de un dispositivo o de todos. Cambiar la contraseña cierra todas las sesiones.
- Corrige que un episodio de pódcast emparejado manualmente no recibiera su URL de descarga.
- La acción Restablecer contraseña de administrador ahora también cierra las sesiones existentes de la cuenta root.

Notas de la versión completas: https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.0`,
    de_DE: `Audiobookshelf auf 2.36.0 aktualisiert.

- Sicherheitskorrekturen: strengere Prüfung der OIDC-Rücksprung-URL, Zugriffsprüfung je Element bei Sammel-Downloads, Refresh-Tokens werden nicht mehr als API- oder Websocket-Anmeldedaten akzeptiert, und das Root-Konto kann nicht mehr über den Benutzer-Endpunkt gelöscht werden.
- Deine Kontoseite listet jetzt die aktiven Sitzungen auf, sodass du dich auf einem oder allen Geräten abmelden kannst. Eine Passwortänderung beendet alle Sitzungen.
- Behebt, dass eine manuell zugeordnete Podcast-Episode keine Download-URL erhielt.
- Die Aktion „Admin-Passwort zurücksetzen“ meldet nun auch die bestehenden Sitzungen des Root-Kontos ab.

Vollständige Versionshinweise: https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.0`,
    pl_PL: `Zaktualizowano Audiobookshelf do 2.36.0.

- Poprawki bezpieczeństwa: ściślejsza weryfikacja adresu zwrotnego OIDC, sprawdzanie dostępu do każdego elementu przy zbiorczym pobieraniu, tokeny odświeżania nie są już akceptowane jako dane logowania do API ani websocketu, a konta root nie można już usunąć przez punkt końcowy użytkowników.
- Strona konta pokazuje teraz aktywne sesje, więc możesz wylogować jedno urządzenie albo wszystkie. Zmiana hasła kończy każdą sesję.
- Naprawia brak adresu pobierania w ręcznie dopasowanym odcinku podcastu.
- Akcja „Zresetuj hasło administratora” wylogowuje teraz także istniejące sesje konta root.

Pełne informacje o wydaniu: https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.0`,
    fr_FR: `Audiobookshelf mis à jour vers 2.36.0.

- Correctifs de sécurité : validation plus stricte de l'URL de retour OIDC, vérification des accès élément par élément lors des téléchargements groupés, les jetons d'actualisation ne sont plus acceptés comme identifiants d'API ou de websocket, et le compte root ne peut plus être supprimé via le point de terminaison des utilisateurs.
- La page de votre compte liste désormais vos sessions actives, pour vous déconnecter d'un appareil ou de tous. Changer votre mot de passe met fin à toutes les sessions.
- Corrige l'absence d'URL de téléchargement sur un épisode de podcast associé manuellement.
- L'action « Réinitialiser le mot de passe administrateur » déconnecte maintenant aussi les sessions existantes du compte root.

Notes de version complètes : https://github.com/advplyr/audiobookshelf/releases/tag/v2.36.0`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
