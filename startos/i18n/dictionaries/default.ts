export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Audiobookshelf!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  'Initial Setup': 4,
  'Setup complete': 5,
  'Open the Web UI to create your admin account': 6,
  'Waiting for the server to respond': 7,

  // interfaces.ts
  'Web UI': 8,
  'The web interface of Audiobookshelf': 9,

  // actions/mediaSources.ts
  'File Browser': 10,
  Nextcloud: 11,
  'Media Sources': 12,
  'Connect Media Storage': 13,
  'Choose where Audiobookshelf reads your existing media libraries. Selected services are mounted read-only inside Audiobookshelf.': 14,

  // actions/backupMedia.ts
  'Back Up Media': 15,
  'Include media stored in Audiobookshelf in backups': 16,
  'When enabled, audiobooks and podcasts stored directly in Audiobookshelf are included in StartOS backups. Leave this off if your media comes from File Browser or Nextcloud, or if your library is too large to back up.': 17,
  'Audiobook and podcast libraries can be very large. Backups may take significant time and storage.': 18,

  // actions/resetAdminPassword.ts
  'Reset Admin Password': 19,
  'Generate a new random password for the root admin account. Use this if you are locked out of the web interface.': 20,
  'This replaces the current root account password with a new random one.': 21,
  'Admin Password Reset': 22,
  'Your root admin password has been reset. Save these credentials in a password manager.': 23,
  Username: 24,
  Password: 25,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
