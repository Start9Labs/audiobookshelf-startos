# Updating the upstream version

This package wraps [Audiobookshelf](https://github.com/advplyr/audiobookshelf). It builds a patched image from the official `ghcr.io/advplyr/audiobookshelf` image (see [`Dockerfile`](Dockerfile) and the "What Is Changed from Upstream" section of [README.md](README.md)).

## Determining the upstream version

Fetch the latest release tag:

```sh
gh release view -R advplyr/audiobookshelf --json tagName -q .tagName
```

The current pin lives in [`Dockerfile`](Dockerfile) at the `FROM ghcr.io/advplyr/audiobookshelf:<version>` line (the manifest sets `images.audiobookshelf.source` to `dockerBuild`, so there is no `dockerTag` to bump).

## Applying the bump

1. Bump the `FROM ghcr.io/advplyr/audiobookshelf:<new version>` tag in [`Dockerfile`](Dockerfile) (drop the leading `v` from the release tag).
2. Update `version` and `releaseNotes` in `startos/versions/current.ts` (e.g. `2.35.0:0` → `2.36.0:0`).
3. Run `make` and confirm the build succeeds. **The build is the verification** — each client patch first asserts its anchor string is present, so if upstream reshaped the bundle the build fails loudly here rather than silently shipping an un-patched client.
4. If the database schema, password hashing (`server/auth/LocalAuthStrategy.js`), or the `users` table changed upstream, re-verify the **Reset Admin Password** action against the new image.

## If a client patch assertion fails

A failed `grep`/`test` in the `Dockerfile` `RUN` steps means upstream changed something a patch depends on. Pull the new image, re-find the anchors, then update the `Dockerfile`:

```sh
ver=<new version>
# GitHub update-check URL (Patch 2) — should still be this literal string:
docker run --rm --entrypoint sh ghcr.io/advplyr/audiobookshelf:$ver -c \
  'grep -rho "https://api.github.com/repos/advplyr/audiobookshelf/releases" /app/client/dist/_nuxt/ | sort -u'

# Service-worker Workbox URL + config (Patch 1) — confirms the jsDelivr URL and
# the workbox-cdn version to vendor (the `npm pack workbox-cdn@<ver>` in the build stage):
docker run --rm --entrypoint sh ghcr.io/advplyr/audiobookshelf:$ver -c \
  'grep -oE "workboxURL.:.[^\"]*|.config.:\{[^}]*\}" /app/client/dist/sw.js'

# Base path (the patched URLs assume /audiobookshelf):
docker run --rm --entrypoint sh ghcr.io/advplyr/audiobookshelf:$ver -c \
  'grep -n "ROUTER_BASE_PATH" /app/index.js'
```

Update the matching `sed`/`grep` patterns (and `workbox-cdn@<version>` in the build stage if upstream bumped Workbox) so the assertions pass again.
