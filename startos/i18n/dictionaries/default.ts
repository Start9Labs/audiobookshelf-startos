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
  'FileBrowser Quantum': 10,
  Nextcloud: 11,
  'External Libraries': 12,
  'Connect NextExplorer, FileBrowser Quantum or Nextcloud as read-only external libraries. Audiobookshelf can scan and play media stored there but cannot modify it. Uploads and podcast downloads always go to the libraries managed by Audiobookshelf.': 13,

  // actions/resetAdminPassword.ts
  'Reset Admin Password': 14,
  'Generate a new random password for the root admin account. Use this if you are locked out of the web interface.': 15,
  'This replaces the current root account password with a new random one.': 16,
  'Admin Password Reset': 17,
  'Your root admin password has been reset. Save these credentials in a password manager.': 18,
  Username: 19,
  Password: 20,
  NextExplorer: 21,
  '- NextExplorer: its storage appears at /mnt/nextexplorer, one folder per location\n- FileBrowser Quantum: its storage appears at /mnt/filebrowser\n- Nextcloud: its storage appears at /mnt/nextcloud, with one folder per account under /mnt/nextcloud/data': 22,
  'NextExplorer Subfolder': 23,
  'FileBrowser Quantum Subfolder': 24,
  'Nextcloud Subfolder': 25,
  "Mount only this folder, starting with its location, e.g. Files/Audiobooks, which then appears at /mnt/nextexplorer/Files/Audiobooks. Leave empty to mount all of NextExplorer's storage.": 26,
  "Mount only this folder, e.g. Audiobooks, which then appears at /mnt/filebrowser/Audiobooks. Leave empty to mount all of FileBrowser Quantum's storage.": 27,
  "Mount only this folder, e.g. data/admin/files/Audiobooks for the account named admin, which then appears at /mnt/nextcloud/data/admin/files/Audiobooks. Leave empty to mount all of Nextcloud's storage, including its configuration.": 28,
  'Must be a relative path, such as Audiobooks, with no leading / and no .. segments': 29,
  'The folder "${subfolder}" was not found in ${library}. Check the path, and that ${library} is installed.': 30,
  'The folder "${subfolder}" was not found in ${library}, so it is not mounted. Create it there and restart Audiobookshelf, or change it in External Libraries.': 31,
  '${library} is not installed, so it is not mounted. Install it and restart Audiobookshelf, or deselect it in External Libraries.': 32,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
