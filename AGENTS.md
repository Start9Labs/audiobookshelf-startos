# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Keep the external-library mounts `readonly: true`.** That flag, not a convention, is what makes "Audiobookshelf cannot modify your Nextcloud files" true. It is also why the dependencies are `kind: 'exists'` rather than `'running'` — only the volume is needed, so a stopped File Browser must not stop the audiobook server.
- **Adding an external library means editing four places in step:** the enum in `startos/fileModels/store.json.ts`, the multiselect values in `startos/actions/externalLibraries.ts`, the mount branch in `startos/main.ts`, and the dependency branch in `startos/dependencies.ts` — plus manifest metadata for the new dependency.
- **`absdatabase.sqlite` is the application's, not ours.** `reset-admin-password` is the only code that touches it, and it is `only-stopped` for that reason. Don't add a second writer, and don't reach into it from `main`.
