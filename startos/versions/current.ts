import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.37.2:4',
  releaseNotes: {
    en_US:
      'Added opt-in Service Integrations with automatically generated API credentials for connected StartOS services. Library scans require administrator API access through a dedicated non-root account; root credentials remain private. Disabling integrations revokes the shared credential.',
    es_ES:
      'Se añadieron Integraciones de servicios opcionales con credenciales API generadas automáticamente para servicios StartOS conectados. Escanear bibliotecas requiere acceso API de administrador mediante una cuenta dedicada no raíz; las credenciales raíz permanecen privadas. Desactivar las integraciones revoca la credencial compartida.',
    de_DE:
      'Optionale Dienstintegrationen mit automatisch erzeugten API-Zugangsdaten für verbundene StartOS-Dienste hinzugefügt. Bibliotheksscans erfordern Administrator-API-Zugriff über ein eigenes Nicht-Root-Konto; Root-Zugangsdaten bleiben privat. Das Deaktivieren widerruft die gemeinsamen Zugangsdaten.',
    pl_PL:
      'Dodano opcjonalne Integracje usług z automatycznie generowanymi danymi API dla połączonych usług StartOS. Skanowanie bibliotek wymaga uprawnień administratora API przez osobne konto inne niż root; dane root pozostają prywatne. Wyłączenie integracji unieważnia wspólne dane dostępu.',
    fr_FR:
      'Ajout d’Intégrations de services facultatives avec des identifiants API générés automatiquement pour les services StartOS connectés. Les analyses des bibliothèques exigent un accès API administrateur via un compte dédié non racine ; les identifiants racine restent privés. Désactiver les intégrations révoque l’identifiant partagé.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
