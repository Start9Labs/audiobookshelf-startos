# Updating the upstream version

This package wraps [Audiobookshelf](https://github.com/advplyr/audiobookshelf), distributed as the official `ghcr.io/advplyr/audiobookshelf` image.

## Determining the upstream version

Fetch the latest release tag:

```sh
gh release view -R advplyr/audiobookshelf --json tagName -q .tagName
```

The current pin lives in `startos/manifest/index.ts` at `images.audiobookshelf.source.dockerTag` (the version after the `:` in `ghcr.io/advplyr/audiobookshelf:<version>`).

## Applying the bump

1. Bump `dockerTag` in `startos/manifest/index.ts` to `ghcr.io/advplyr/audiobookshelf:<new version>` (drop the leading `v` from the release tag).
2. Update `version` and `releaseNotes` in `startos/versions/current.ts` (e.g. `2.35.0:0` → `2.36.0:0`).
3. Run `make` and confirm the build succeeds.
4. If the database schema, password hashing (`server/auth/LocalAuthStrategy.js`), or the `users` table changed upstream, re-verify the **Reset Admin Password** action against the new image.
