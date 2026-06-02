import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.35.1:0',
  releaseNotes: {
    en_US: `**Bumps**

- Audiobookshelf → 2.35.1

**Privacy**

- The web interface no longer reaches third-party services from your browser: the GitHub update check and the jsDelivr CDN (Workbox) are now served locally.`,
    es_ES: `**Actualizaciones**

- Audiobookshelf → 2.35.1

**Privacidad**

- La interfaz web ya no contacta con servicios de terceros desde tu navegador: la comprobación de actualizaciones de GitHub y la CDN de jsDelivr (Workbox) ahora se sirven localmente.`,
    de_DE: `**Aktualisierungen**

- Audiobookshelf → 2.35.1

**Datenschutz**

- Die Weboberfläche kontaktiert keine Drittanbieter mehr aus Ihrem Browser: die GitHub-Update-Prüfung und das jsDelivr-CDN (Workbox) werden jetzt lokal bereitgestellt.`,
    pl_PL: `**Aktualizacje**

- Audiobookshelf → 2.35.1

**Prywatność**

- Interfejs internetowy nie łączy się już z usługami zewnętrznymi z Twojej przeglądarki: sprawdzanie aktualizacji w GitHub oraz CDN jsDelivr (Workbox) są teraz obsługiwane lokalnie.`,
    fr_FR: `**Mises à jour**

- Audiobookshelf → 2.35.1

**Confidentialité**

- L’interface web ne contacte plus de services tiers depuis votre navigateur : la vérification des mises à jour GitHub et le CDN jsDelivr (Workbox) sont désormais servis localement.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
