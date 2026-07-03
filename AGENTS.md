# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `audiobookshelf`.**
- **The service image is built locally from `./Dockerfile`, not a prebuilt upstream image** — it re-bases `ghcr.io/advplyr/audiobookshelf` to strip the web client's third-party phone-homes (the GitHub update check and the jsDelivr/Workbox CDN). Bump the `FROM` tag in the `Dockerfile` in lockstep with the version in `startos/versions/current.ts`. See `UPDATING.md`.
- **File Browser and Nextcloud are optional dependencies** mounted read-only as external libraries, toggled by the External Libraries action (`startos/actions/externalLibraries.ts`); the selection is persisted in `store.json` and drives both the dependency set and the dependency mounts in `main.ts`.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach audiobookshelf -n audiobookshelf-sub -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `audiobookshelf-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
