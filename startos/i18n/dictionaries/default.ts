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

  // actions/externalLibraries.ts
  'File Browser': 10,
  Nextcloud: 11,
  'External Libraries': 12,
  'Connect File Browser or Nextcloud as read-only external libraries. Audiobookshelf can scan and play media stored there but cannot modify it. Uploads and podcast downloads always go to the libraries managed by Audiobookshelf.': 13,

  // actions/resetAdminPassword.ts
  'Reset Admin Password': 14,
  'Generate a new random password for the root admin account. Use this if you are locked out of the web interface.': 15,
  'This replaces the current root account password with a new random one.': 16,
  'Admin Password Reset': 17,
  'Your root admin password has been reset. Save these credentials in a password manager.': 18,
  Username: 19,
  Password: 20,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
