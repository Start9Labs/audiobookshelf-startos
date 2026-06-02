<p align="center">
  <img src="icon.svg" alt="Audiobookshelf Logo" width="21%">
</p>

# Audiobookshelf on StartOS

> **Upstream docs:** <https://www.audiobookshelf.org/docs>
>
> Everything not listed in this document should behave the same as upstream
> Audiobookshelf. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable.

[Audiobookshelf](https://github.com/advplyr/audiobookshelf) is a self-hosted audiobook and podcast server with progress syncing, multi-user support, podcast auto-download, and open-source mobile apps.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property      | Value                                |
| ------------- | ------------------------------------ |
| Image         | Built from `ghcr.io/advplyr/audiobookshelf:<version>` via [`Dockerfile`](Dockerfile), patched to remove the web client's third-party calls (see [What Is Changed from Upstream](#what-is-changed-from-upstream)) |
| Architectures | x86_64, aarch64                      |
| Entrypoint    | Upstream default (`tini -- node index.js`) via `sdk.useEntrypoint()` |

---

## Volume and Data Layout

| Volume       | Mount Point    | Purpose                                              |
| ------------ | -------------- | ---------------------------------------------------- |
| `config`     | `/config`      | SQLite database (`absdatabase.sqlite`), users, libraries, settings, and the StartOS `store.json` |
| `metadata`   | `/metadata`    | Cover art, cache, item metadata, logs, and Audiobookshelf's internal backups |
| `audiobooks` | `/audiobooks`  | Writable audiobook library managed by Audiobookshelf (uploads land here) |
| `podcasts`   | `/podcasts`    | Writable podcast library managed by Audiobookshelf (downloaded episodes land here) |

When an optional external library is connected (see [Dependencies](#dependencies)), its data volume is mounted **read-only**:

| Mount Point        | Source                         |
| ------------------ | ------------------------------ |
| `/mnt/filebrowser` | File Browser `data` volume     |
| `/mnt/nextcloud`   | Nextcloud `nextcloud` volume   |

`store.json` (in the `config` volume) persists StartOS-specific settings — the selected external libraries.

---

## Installation and First-Run Flow

Audiobookshelf performs first-run setup through its own web interface: on first visit it prompts you to create the **root admin account**. The package does not pre-create or auto-generate this account. Until it exists, the `initial-setup` health check reports that the account still needs to be created.

`PORT`, `CONFIG_PATH`, and `METADATA_PATH` are set by StartOS to match the mounts above.

---

## Configuration Management

| StartOS-Managed (actions / env vars)                          | Upstream-Managed (Audiobookshelf web UI)                       |
| ------------------------------------------------------------- | -------------------------------------------------------------- |
| `PORT`, `CONFIG_PATH`, `METADATA_PATH` (fixed to the mounts)  | Libraries, users, permissions, metadata providers, scheduled tasks, podcast settings, server settings |
| External libraries (File Browser / Nextcloud, read-only)      | Everything else                                                |
| Root admin password reset                                     | Day-to-day password changes (in the web UI)                    |

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose                       |
| --------- | ---- | -------- | ----------------------------- |
| Web UI    | 80   | HTTP     | Audiobookshelf web app + API  |

The web app and the API (used by the mobile apps) are served on the same interface. Audiobookshelf has its own authentication, so the interface is not masked.

**Access methods:**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

---

## Actions (StartOS UI)

| Action | ID | Purpose | Availability | Input | Output |
| ------ | -- | ------- | ------------ | ----- | ------ |
| External Libraries | `external-libraries` | Connect File Browser and/or Nextcloud as read-only external libraries Audiobookshelf can scan and play | Any status | Multiselect of available storage services | — |
| Reset Admin Password | `reset-admin-password` | Generate a new random password for the root admin account and write it directly to the database | Only when stopped | — | Root username + new password (masked, copyable) |

All actions are `visibility: 'enabled'`.

---

## Backups and Restore

**Always included:**

- `config` volume (database, users, libraries, settings)
- `metadata` volume (covers, cache, logs, internal backups)
- `audiobooks` and `podcasts` volumes — the media Audiobookshelf manages directly.

All volumes are mirrored with rsync (`--delete`), so a repeat backup of a large library only transfers what changed. This is **differential, not incremental**: the backup target mirrors the volume's current state rather than accumulating history, so deleting media on the server also removes it from the backup target on the next run.

**Restore behavior:** all four volumes are restored from the backup archive.

Media provided by File Browser or Nextcloud is **not** backed up by Audiobookshelf; back it up through that service instead.

---

## Health Checks

| Check         | Method | Messages |
| ------------- | ------ | -------- |
| Web Interface | HTTP GET `/healthcheck` (returns 200) | Success: "The web interface is ready" / Error: "The web interface is not ready" |
| Initial Setup | HTTP GET `/status` (`isInit`) from inside the container | `success`: "Setup complete" once a root account exists; `loading`: "Open the Web UI to create your admin account"; `starting`: "Waiting for the server to respond" |

---

## Dependencies

Both dependencies are **optional** and serve only as **read-only external libraries** — existing collections Audiobookshelf can scan and play but never writes to. They are mounted by file path (Audiobookshelf does not call their APIs), so they need only be installed, not running. Audiobookshelf is the sole writable store: all uploads and podcast downloads go to its own `audiobooks` / `podcasts` volumes.

| Dependency | Required | Version | Mounted Volume | Mount Point | Purpose |
| ---------- | -------- | ------- | -------------- | ----------- | ------- |
| File Browser | Optional | `>=2.63.2:0` | `data` (read-only) | `/mnt/filebrowser` | Scan an existing read-only library managed in File Browser |
| Nextcloud | Optional | `>=32.0.8:0` | `nextcloud` (read-only) | `/mnt/nextcloud` | Scan an existing read-only library managed in Nextcloud |

A dependency is added only when selected via the **External Libraries** action.

---

## Limitations and Differences

1. **External libraries are read-only.** Libraries pointed at `/mnt/filebrowser` or `/mnt/nextcloud` can be scanned and played but never written to — Audiobookshelf is the only writable store. Podcast auto-download and web uploads must target the writable `/audiobooks` or `/podcasts` libraries.
2. **The Reset Admin Password action requires the service to be stopped** — it writes directly to the database.

---

## What Is Changed from Upstream

The web client is patched (at image build time, in [`Dockerfile`](Dockerfile)) to remove the two third-party requests the browser would otherwise make on its own — appropriate for a sovereign-computing platform:

- **Update check (`api.github.com`) — neutralized.** The client no longer polls GitHub for new releases. Updates come through the StartOS registry, so the in-app "update available" banner is moot; it is served a same-origin "you are on the latest release" payload (`no-update.json`) instead. No banner, no error.
- **Workbox (`cdn.jsdelivr.net`) — vendored.** The PWA service worker now loads Workbox from this server's own origin (`/audiobookshelf/workbox/`) rather than the jsDelivr CDN. PWA install and offline app-shell caching keep working, with no external dependency.

Two other external calls need no patch: the **Google Cast** SDK (`www.gstatic.com`) is gated behind the `chromecastEnabled` server setting, which is off by default, and the server-side **ffmpeg/nusqlite3** binary download is already suppressed by the upstream image's `SOURCE=docker` env.

Each patch asserts its anchor strings at build time, so an upstream bump that reshapes the bundle fails the build rather than silently shipping an un-patched client (see [UPDATING.md](UPDATING.md)).

## What Is Unchanged from Upstream

Libraries, users, permissions, metadata fetching, podcast search/subscribe/download, Audiobookshelf's own scheduled backups, the API, ebook support, and the mobile apps all behave exactly as documented upstream.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: audiobookshelf
image: built from ghcr.io/advplyr/audiobookshelf via ./Dockerfile (web client patched to drop third-party calls)
architectures: [x86_64, aarch64]
volumes:
  config: /config
  metadata: /metadata
  audiobooks: /audiobooks
  podcasts: /podcasts
dependency_mounts:
  filebrowser: /mnt/filebrowser (read-only)
  nextcloud: /mnt/nextcloud (read-only)
ports:
  ui: 80
dependencies:
  - filebrowser (optional)
  - nextcloud (optional)
startos_managed_env_vars:
  - PORT
  - CONFIG_PATH
  - METADATA_PATH
actions:
  - external-libraries
  - reset-admin-password
```
