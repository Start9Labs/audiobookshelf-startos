<p align="center">
  <img src="icon.svg" alt="Audiobookshelf Logo" width="21%">
</p>

# Audiobookshelf on StartOS

> Everything not listed in this document should behave the same as upstream
> Audiobookshelf. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Audiobookshelf](https://github.com/advplyr/audiobookshelf) is a self-hosted audiobook and podcast server. This package builds a patched image with the web client's calls to third-party origins removed, splits its storage across four volumes, and can mount another service's files in as a read-only library.

- **Upstream repo:** <https://github.com/advplyr/audiobookshelf>
- **Wrapper repo:** <https://github.com/Start9Labs/audiobookshelf-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The image is the upstream image with two patches applied on top, because upstream's prebuilt web bundle makes automatic calls from the user's browser to origins outside the server.

| Property      | Value                                                                   |
| ------------- | ----------------------------------------------------------------------- |
| Image         | Built from `Dockerfile`, `FROM ghcr.io/advplyr/audiobookshelf`          |
| Architectures | x86_64, aarch64                                                         |
| Entrypoint    | Upstream default                                                        |
| Subcontainer  | `audiobookshelf-sub` — the `primary` daemon, and the one to `attach` to |

The two patches: the PWA service worker's Workbox import is repointed from a public CDN to a copy vendored into the image, and the client's release check against GitHub is repointed at a static same-origin file that always reports the running version as current. Each patch first asserts that the string it is about to rewrite is present, so an upstream bump that reshapes the bundle fails the build rather than silently shipping an unpatched client. Two further outbound calls need no patch: the Cast SDK is gated behind a server setting that defaults off, and upstream's own image already suppresses the server-side binary downloads.

The Reset Admin Password action runs in a short-lived `reset-admin` subcontainer from the same image, with only the config volume mounted.

## Volume and Data Layout

Four volumes, split so that a backup, a media move, or a permissions problem touches one concern at a time.

| Volume       | Mount Point   | Purpose                                                           |
| ------------ | ------------- | ----------------------------------------------------------------- |
| `config`     | `/config`     | The application database (`absdatabase.sqlite`), and `store.json` |
| `metadata`   | `/metadata`   | Cover art, cached metadata, and generated artifacts               |
| `audiobooks` | `/audiobooks` | The writable audiobook library — uploads land here                |
| `podcasts`   | `/podcasts`   | The writable podcast library — subscriptions download here        |

When an external library is connected, that service's storage appears as a fifth mount, read-only: `/mnt/filebrowser` or `/mnt/nextcloud`. Which folder inside it becomes a library is chosen in Audiobookshelf's own settings, not here.

## File Models

One model, holding one setting: which other services are mounted in as read-only libraries.

| File                 | Format | Modelled                | Written by                                    |
| -------------------- | ------ | ----------------------- | --------------------------------------------- |
| `/config/store.json` | JSON   | Yes — `FileHelper.json` | Every init, and the External Libraries action |

`externalLibraries` is a list of service ids. Init merges the file without overwriting the list, so the selection survives updates and restores; the action replaces it wholesale with whatever the form submitted. Nothing else writes it, and a value outside the known set is discarded rather than honoured.

The setting has reach beyond its own file: `main` reads it to decide which dependency volumes to mount, and `setDependencies` reads it to decide which dependencies to declare. Both hold it in a reactive `const`, so changing the selection restarts the service with the new mounts.

**The application's own database is not a file model.** `absdatabase.sqlite` on the config volume holds users, libraries, listening progress, and every server setting; the package neither reads nor writes it in normal operation. The one exception is Reset Admin Password, which edits it directly while the service is stopped.

The only configuration passed to the application is environment — `PORT`, `CONFIG_PATH`, `METADATA_PATH` — and it is the same on every start.

## Dependencies

Both are optional and neither is required to run: they appear only when selected in [External Libraries](#actions).

| Dependency          | Kind     | Health checks | Mount                         | Why                                      |
| ------------------- | -------- | ------------- | ----------------------------- | ---------------------------------------- |
| FileBrowser Quantum | `exists` | none          | `/mnt/filebrowser`, read-only | Scan and play media already stored there |
| Nextcloud           | `exists` | none          | `/mnt/nextcloud`, read-only   | Scan and play media already stored there |

Only the volume is needed, so neither service has to be running for Audiobookshelf to start and read it.

The mounts are `readonly: true`, so Audiobookshelf cannot write to them even if asked to: uploads and podcast downloads always go to its own volumes.

## Network Access and Interfaces

One interface, serving both the web app and the API the mobile apps use. Nothing is exported for dependent services.

| Interface | Id   | Type | Port | Description                              |
| --------- | ---- | ---- | ---- | ---------------------------------------- |
| Web UI    | `ui` | ui   | 80   | The Audiobookshelf web interface and API |

The port is bound on the `ui-multi` MultiHost and is not masked.

## Installation and First-Run Flow

Nothing is generated or bootstrapped at install and no task is raised: the service starts immediately, and account creation happens inside the application on first visit, exactly as upstream.

The one thing worth knowing is that this state is visible from outside the app. A dedicated health check reports `loading` with "Open the Web UI to create your admin account" until the root account exists, so a freshly installed server that looks unhealthy is usually just waiting for that first visit. See [Health Checks](#health-checks).

Connecting an external library, if wanted, comes later and in this order: install the other service, put the media in it, then run the action — the mount only appears on the restart the action triggers.

## Actions

Two actions, both user-facing.

### External Libraries

Mounts FileBrowser Quantum's or Nextcloud's storage into Audiobookshelf, read-only. Run it after installing the other service and moving media into it.

- **What it changes:** `externalLibraries` in `store.json`, and through it the package's mount set and dependency set.
- **Cost:** seconds, then a restart — the mounts can only change when the container is recreated.
- **Repeat safety:** safe to re-run; the form is pre-filled with the current selection and replaces it wholesale, so clearing a checkbox removes that mount.
- **What happens next:** the storage appears at a fixed path inside the container. Nothing becomes a library until you point one at a folder under it in Audiobookshelf's own settings — this action connects storage, it does not create libraries.

### Reset Admin Password

Generates a new random password for the root admin account. Run it when locked out of the web interface; ordinary password changes belong in the app.

- **What it changes:** the root account's password hash in `absdatabase.sqlite`, and it clears that account's sessions, so existing logins are signed out. It also clears the account's active and locked flags.
- **Availability:** only while the service is stopped, because it writes the database the application would otherwise have open.
- **Repeat safety:** safe to re-run; each run generates a fresh password and invalidates the previous one.
- **Outputs:** the username and the new password, the password masked and copyable. It is not recoverable afterwards.
- **Guard:** it fails with a clear message rather than doing anything if no root account exists yet — that is, if the web UI has never been opened.

## Tasks

None. This package raises no tasks, so the service is never held on a prompt and its ordinary controls are always available.

## Health Checks

Two checks, and the second exists to make a normal state legible rather than to detect a fault.

| Check           | Displayed       | Method                                         | Grace Period |
| --------------- | --------------- | ---------------------------------------------- | ------------ |
| `primary`       | "Web Interface" | HTTP `GET /healthcheck` on the UI port         | SDK default  |
| `initial-setup` | "Initial Setup" | The application's `/status`, read for `isInit` | —            |

**`primary` failing** means the server is not answering — read the service logs for a database or startup error.

**`initial-setup` reports `loading`, not a failure, until the root account is created**, and succeeds permanently once it exists. It reports `starting` while the server has not answered yet, which is expected during startup. A user asking why a fresh install shows an incomplete check has usually not opened the web UI yet.

## Backups and Restore

All four volumes are copied wholesale — `sdk.Backups.ofVolumes('config', 'metadata', 'audiobooks', 'podcasts')`. There is no dump step and nothing is excluded, which means **the media is in the backup**: an audiobook and podcast collection is usually the largest thing on the server, and the backup is sized accordingly.

- **Included:** the database with users, libraries and listening progress; cover art and cached metadata; and every file in the two writable libraries.
- **Not included:** anything in a connected external library. That storage belongs to FileBrowser Quantum or Nextcloud and is covered by that service's own backup, not this one's.
- **Restore:** complete, including accounts and progress. If an external library was connected, that dependency must be installed for the service to start with its mount.

## Limitations and Differences

1. **External libraries are read-only, structurally.** The mount itself is read-only, so podcast downloads and uploads cannot be directed there; they go to `/audiobooks` and `/podcasts`.
2. **Connecting or disconnecting an external library restarts the service**, because a container's mounts are fixed for its lifetime.
3. **The client's update check always reports "up to date."** It is redirected to a static same-origin file, since updates arrive through the StartOS registry rather than from upstream's releases.
4. **The service worker's Workbox runtime is served from your server**, not from a public CDN.
5. **Media is included in every backup**, with no way to exclude it.
6. **No riscv64 build.** x86_64 and aarch64 only.

---

## Quick Reference for AI Consumers

```yaml
package_id: audiobookshelf
image: ./Dockerfile # FROM ghcr.io/advplyr/audiobookshelf, patched
architectures:
  - x86_64
  - aarch64
subcontainers:
  - audiobookshelf-sub # the running daemon
  - reset-admin # temporary; the Reset Admin Password action
volumes:
  config: /config
  metadata: /metadata
  audiobooks: /audiobooks
  podcasts: /podcasts
file_models:
  - /config/store.json
startos_managed_env_vars:
  - PORT
  - CONFIG_PATH
  - METADATA_PATH
dependencies: # optional, kind "exists"; mounted read-only when selected
  - filebrowser # /mnt/filebrowser
  - nextcloud # /mnt/nextcloud
interfaces:
  ui: { type: ui, port: 80 }
actions:
  - external-libraries
  - reset-admin-password # only-stopped
tasks: []
health_checks:
  - primary # displayed "Web Interface"
  - initial-setup # displayed "Initial Setup"; loading until the root account exists
```
