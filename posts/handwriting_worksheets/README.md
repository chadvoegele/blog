# Handwriting Worksheets

The post embeds the upstream app in an iframe so its styles and print layout
stay independent of the blog. The full-screen link opens the same local app.

```text
Upstream checkout → copy.mjs → ignored app/ → Eleventy passthrough → _site/
                                                                  ↓
Blog home → post → iframe / full-screen app → worksheet → print
```

The app has no build step or runtime dependencies. Keep its source in a separate
checkout; copied assets in `app/` are gitignored, like Suppalist's generated assets.

From the blog root, before building or deploying:

```sh
npm ci
npm run copy:handwriting -- /path/to/HandwritingWorksheets
npm test
npm run build
./deploy.sh posts/handwriting_worksheets
```

Use the checkout root (the directory containing `src/` and `LICENSE`).
Tested with upstream revision `63cfe26`. The copy includes the upstream MIT
license. Repeat the copy after updating upstream; it replaces the old app assets.
Do not deploy this post without copying the app first.
