# Audiobookshelf

## Documentation

- [Audiobookshelf documentation](https://audiobookshelf.org/docs) — the official guide to libraries, podcasts, users, settings, and walkthroughs for organizing audiobooks and podcasts.

## What you get on StartOS

A self-hosted audiobook and podcast server with one web interface. The same interface serves the web app and the API used by the Audiobookshelf mobile apps. Your library, listening progress, users, and settings all live on your server.

Audiobookshelf manages two writable libraries for you: **audiobooks** and **podcasts**. Podcasts you subscribe to download into the podcasts library, and files you upload through the web app land in the audiobooks library — Audiobookshelf is the only thing that writes media. If you already keep a media collection in **NextExplorer**, **FileBrowser Quantum** or **Nextcloud**, you can connect it as a read-only **external library** that Audiobookshelf scans and plays but never changes.

## Getting set up

1. Open the **Web UI** from the Dashboard. On first launch Audiobookshelf asks you to create the **root admin account** — choose a username and a strong password. This is the only account that can never be deleted, so save the credentials.
2. Create your first **library**. For audiobooks you upload or files Audiobookshelf manages, point the library at `/audiobooks`. For podcasts, point it at `/podcasts`.
3. Add content: upload audiobooks directly in the web app, or open a podcast library and search for and subscribe to shows — episodes download automatically.
4. Install the Audiobookshelf app on your phone (Android or iOS) and sign in using your server's address and the account from step 1.

### External libraries (optional)

If your audiobooks or podcasts already live in NextExplorer, FileBrowser Quantum or Nextcloud, you can add them as read-only external libraries:

1. Install NextExplorer (recommended), FileBrowser Quantum and/or Nextcloud first, and move your media into them.
2. Run the **External Libraries** action and select the service(s). To let Audiobookshelf see only the folder that holds your media, rather than all of that service's storage, also enter that folder as the service's **subfolder**. This matters most for Nextcloud, whose storage also holds its configuration and every account's files:
   - **NextExplorer** — start with the location, e.g. `Files/Audiobooks`.
   - **FileBrowser Quantum** — e.g. `Audiobooks`.
   - **Nextcloud** — start with `data/`, then the account name and `files/`, e.g. `data/admin/files/Audiobooks`.
3. Audiobookshelf restarts with that storage mounted read-only, at a fixed location inside Audiobookshelf — `/mnt/nextexplorer` for NextExplorer, `/mnt/filebrowser` for FileBrowser Quantum, `/mnt/nextcloud` for Nextcloud. With a subfolder, only that folder appears, at the same path it has in the service, e.g. `/mnt/nextcloud/data/admin/files/Audiobooks`.
4. In Audiobookshelf, add a library (or edit an existing one) and use its **folder browser** to drill into the specific folder that holds that library's media. The paths are the same with or without a subfolder; with one, choose that folder or a folder inside it:
   - **NextExplorer** — each location is a folder, so start with the location name, e.g. `/mnt/nextexplorer/Files/Audiobooks`.
   - **FileBrowser Quantum** — your files are at the top level, e.g. `/mnt/filebrowser/Audiobooks`.
   - **Nextcloud** — Nextcloud is multi-user, so under `/mnt/nextcloud/data` you will see one folder per Nextcloud account. Open the account that owns the media, e.g. `/mnt/nextcloud/data/<username>/files/Audiobooks`. Add more than one as separate libraries if your media is split across accounts.

The StartOS action decides what Audiobookshelf can see; you pick which folders become libraries in Audiobookshelf's own library settings. External libraries are read-only, so use them for collections you only scan and play. Anything Audiobookshelf needs to write — uploads and podcast downloads — must use the writable `/audiobooks` and `/podcasts` libraries.

If a selected service is not installed, or its subfolder is later renamed or deleted, Audiobookshelf still starts, without that library, and its **External Libraries** health check says which one and why. Install the service or create the folder again and restart Audiobookshelf, or change the selection in the action.

> [!NOTE]
> Reading Nextcloud files directly has limits: media kept in **Group Folders** or **External Storage** is not under `data/<username>/files/`, and if Nextcloud's **server-side encryption** is enabled the files on disk are encrypted and Audiobookshelf cannot read them. For those cases, use NextExplorer instead, or copy the media into Audiobookshelf's own `/audiobooks` and `/podcasts` libraries.

## Using Audiobookshelf

### Web interface

The first screen is the account-creation prompt on a fresh install, and the login screen afterward. From there you manage libraries, users, metadata, and server settings — see the upstream documentation for the full feature set.

### Actions

- **External Libraries** — connect NextExplorer, FileBrowser Quantum or Nextcloud, or one folder of each, as read-only libraries that Audiobookshelf scans and plays. Audiobookshelf never writes to them, so podcast downloads and uploads still go to its own libraries.
- **Reset Admin Password** — if you are locked out of the root admin account, stop the service and run this action. It generates a new random password, shows it to you, and signs that account out everywhere, so anyone still logged in has to sign in again with the new password. Day-to-day password changes are done in the web app under your account settings.

### Backups

Your database, settings, cover art, and the **audiobooks** and **podcasts** libraries are all included in StartOS backups automatically — there is no setting to turn this off. Because audiobook and podcast libraries can grow very large, expect backups to take more time and storage accordingly. Media you keep in **NextExplorer**, **FileBrowser Quantum** or **Nextcloud** is backed up by that service, not by Audiobookshelf.

## Limitations

- External libraries (`/mnt/nextexplorer`, `/mnt/filebrowser`, `/mnt/nextcloud`) are read-only. Audiobookshelf can scan and play them but cannot download podcasts into them or accept uploads there — those always go to its own `/audiobooks` and `/podcasts` libraries.
- Each service can be limited to one subfolder. Media spread over several folders, such as several Nextcloud accounts, needs their common parent folder or the whole storage.
- With a subfolder set, the folders above it, `/mnt/<service>` included, are empty placeholders rather than part of the service's storage. Point libraries at the subfolder or a folder inside it: anything saved into a placeholder is lost when Audiobookshelf restarts.
