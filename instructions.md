# Audiobookshelf

## Documentation

- [Audiobookshelf documentation](https://www.audiobookshelf.org/docs) — the official guide to libraries, podcasts, users, and settings.
- [Audiobookshelf guides](https://www.audiobookshelf.org/guides) — walkthroughs for organizing audiobooks and podcasts.

## What you get on StartOS

A self-hosted audiobook and podcast server with one web interface. The same interface serves the web app and the API used by the Audiobookshelf mobile apps. Your library, listening progress, users, and settings all live on your server.

Audiobookshelf manages two writable libraries for you: **audiobooks** and **podcasts**. Podcasts you subscribe to download into the podcasts library, and files you upload through the web app land in the audiobooks library. If you already keep a media collection in **File Browser** or **Nextcloud**, you can connect either as an additional read-only source.

## Getting set up

1. Open the **Web UI** from the Dashboard. On first launch Audiobookshelf asks you to create the **root admin account** — choose a username and a strong password. This is the only account that can never be deleted, so save the credentials.
2. Create your first **library**. For audiobooks you upload or files Audiobookshelf manages, point the library at `/audiobooks`. For podcasts, point it at `/podcasts`.
3. Add content: upload audiobooks directly in the web app, or open a podcast library and search for and subscribe to shows — episodes download automatically.
4. Install the Audiobookshelf app on your phone (Android or iOS) and sign in using your server's address and the account from step 1.

### Connecting an existing library (optional)

If your audiobooks or podcasts already live in File Browser or Nextcloud:

1. Install File Browser and/or Nextcloud first, and move your media into them.
2. Run the **Connect Media Storage** action and select the service(s).
3. Audiobookshelf restarts with that storage mounted read-only. The whole service appears at a fixed location inside Audiobookshelf — `/mnt/filebrowser` for File Browser, `/mnt/nextcloud` for Nextcloud.
4. In Audiobookshelf, add a library (or edit an existing one) and use its **folder browser** to drill into the specific folder that holds that library's media:
   - **File Browser** — your files are at the top level, e.g. `/mnt/filebrowser/Audiobooks`.
   - **Nextcloud** — files live under each user account, e.g. `/mnt/nextcloud/data/<your-username>/files/Audiobooks`.

You pick the exact media folders inside Audiobookshelf's own library settings — the StartOS action only connects the storage, it does not choose folders for you. These mounts are read-only, so use them for libraries you only scan and play. Keep podcast downloads and web uploads on the writable `/audiobooks` and `/podcasts` libraries.

## Using Audiobookshelf

### Web interface

The first screen is the account-creation prompt on a fresh install, and the login screen afterward. From there you manage libraries, users, metadata, and server settings — see the upstream documentation for the full feature set.

### Actions

- **Connect Media Storage** — choose whether Audiobookshelf also reads media from File Browser or Nextcloud.
- **Include media stored in Audiobookshelf in backups** — by default, backups cover your database, settings, and cover art but not the audiobook and podcast files themselves. Enable this if you store your library inside Audiobookshelf and want those files included. Leave it off if your media comes from File Browser or Nextcloud, or if your library is too large to back up. Media in File Browser or Nextcloud is backed up by that service, not by Audiobookshelf.
- **Reset Admin Password** — if you are locked out of the root admin account, stop the service and run this action. It generates a new random password and shows it to you. Day-to-day password changes are done in the web app under your account settings.

## Limitations

- Libraries pointed at `/mnt/filebrowser` or `/mnt/nextcloud` are read-only. Audiobookshelf can scan and play them but cannot download podcasts into them or accept uploads there.
