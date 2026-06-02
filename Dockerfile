# syntax=docker/dockerfile:1
#
# Patched Audiobookshelf image for StartOS.
#
# advplyr's prebuilt web bundle makes two automatic client-side calls to
# third-party origins from the user's browser. StartOS is a sovereign-computing
# platform, so we neutralize both at build time:
#
#   1. The PWA service worker imports Workbox from cdn.jsdelivr.net.
#      -> Vendor Workbox into the image and point the worker at our own origin.
#   2. The update checker fetches api.github.com/repos/advplyr/.../releases.
#      -> Serve a static "you are on the latest release" payload same-origin.
#
# (A third call, the Google Cast SDK from www.gstatic.com, is gated by the
#  chromecastEnabled server setting which defaults to off, so it needs no patch.
#  The server-side ffmpeg/nusqlite3 binary download is already suppressed by the
#  upstream image's SOURCE=docker env.)
#
# Each patch first ASSERTS its anchor string is present, so an upstream version
# bump that reshapes the bundle fails the build loudly instead of silently
# shipping an un-muted client. When bumping the FROM tag, re-verify per UPDATING.md.

# --- Vendor Workbox (arch-independent JS; build on the native platform) ---
FROM --platform=$BUILDPLATFORM node:20-alpine AS workbox
WORKDIR /w
RUN npm pack workbox-cdn@5.1.4 \
 && tar -xzf workbox-cdn-5.1.4.tgz \
 && mkdir -p /workbox \
 && cp package/workbox/workbox-sw.js package/workbox/*.prod.js /workbox/

# --- Patched Audiobookshelf ---
FROM ghcr.io/advplyr/audiobookshelf:2.35.1

# ABS serves the client under this base path by default
# (index.js: process.env.ROUTER_BASE_PATH = devEnv.RouterBasePath ?? '/audiobookshelf').
ARG BASE_PATH=/audiobookshelf

COPY --from=workbox /workbox /app/client/dist/workbox

# Patch 1: service worker loads Workbox from our origin, not jsDelivr. The
# modulePathPrefix makes workbox-sw fetch its sub-modules locally too (otherwise
# it falls back to the Workbox CDN).
RUN set -eux; \
    sw=/app/client/dist/sw.js; \
    grep -q 'cdn\.jsdelivr\.net/npm/workbox-cdn@5\.1\.4/workbox/workbox-sw\.js' "$sw"; \
    grep -q '"config":{"debug":false}' "$sw"; \
    sed -i \
      -e 's#https://cdn\.jsdelivr\.net/npm/workbox-cdn@5\.1\.4/workbox/workbox-sw\.js#'"$BASE_PATH"'/workbox/workbox-sw.js#' \
      -e 's#"config":{"debug":false}#"config":{"debug":false,"modulePathPrefix":"'"$BASE_PATH"'/workbox/"}#' \
      "$sw"; \
    ! grep -q 'jsdelivr' "$sw"; \
    grep -q "$BASE_PATH/workbox/workbox-sw.js" "$sw"; \
    grep -q 'modulePathPrefix' "$sw"; \
    test -f /app/client/dist/workbox/workbox-sw.js; \
    test -f /app/client/dist/workbox/workbox-core.prod.js

# Patch 2: neutralize the client-side GitHub update check. h() already falls back
# to [] on error and f() needs a release matching the current version, so a single
# current-version entry yields hasUpdate:false with no banner and no console error.
RUN set -eux; \
    version="$(node -p "require('/app/package.json').version")"; \
    printf '[{"tag_name":"v%s","name":"v%s","published_at":"1970-01-01T00:00:00.000Z","body":""}]' "$version" "$version" \
      > /app/client/dist/no-update.json; \
    grep -rq 'https://api\.github\.com/repos/advplyr/audiobookshelf/releases' /app/client/dist/_nuxt/; \
    sed -i 's#https://api\.github\.com/repos/advplyr/audiobookshelf/releases#'"$BASE_PATH"'/no-update.json#g' /app/client/dist/_nuxt/*.js; \
    ! grep -rq 'api\.github\.com/repos/advplyr/audiobookshelf/releases' /app/client/dist/_nuxt/
