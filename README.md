# У гори — hiking helper app

A static app (SPA + PWA) for a teen workshop about mountain hiking. Works
offline and installs on a phone like a native app. No backend, no database —
all content lives in `data.js`, user state lives in `localStorage`.

**Live:** https://just-daniel.github.io/mountainsApp/

## Sections (bottom navigation)

- **Рюкзак** — interactive checklist for 1- and 2-day trips (checks are saved).
  Season switch adds winter gear; a view filter (All / Essential / Optional),
  "hide packed" toggle, and auto-collapsing categories help pack faster.
- **Стаф** — what proper gear looks like: "right / wrong" examples + the
  three-layer rule.
- **Поради** — advice: YouTube videos and readable articles (e.g. first aid).
- **Маршрути** — recommended routes with photos + services to find your own.
- **Безпека** — emergency numbers, what to do if you lose the group, first aid,
  group rules.

## File structure

```
mountainsApp/
├── index.html              ← the app (design + logic; no content here)
├── data.js                 ← ALL CONTENT (edit this file)
├── sw.js                   ← offline cache (service worker)
├── manifest.json           ← PWA settings
├── favicon.png, icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png
└── images/
    └── routes/             ← route photos/illustrations
        ├── parashka.svg
        └── hora_lopata.jpg
```

Content images are grouped by purpose under `images/` (currently `routes/`).
Add new folders (e.g. `images/gear/`) as new content types appear.

## Run locally

Double-click `index.html` — the design and checklist work fully over `file://`.

> PWA offline caching and "install to phone" only activate over `https://`
> (i.e. on GitHub Pages) or a local server (`python3 -m http.server`).

A tiny dev server for live preview lives in `.claude/` (git-ignored) — not part
of the app.

## Deploy (GitHub Pages)

Already set up: **Settings → Pages → Deploy from a branch**, branch `main`,
folder `/ (root)`. Every push to `main` rebuilds the live site automatically.

## Editing content (`data.js`)

No coding needed — just change text between the quotes.

- **`gear`** — object keyed by `"1"` and `"2"` (days). Each is an array of
  categories. Item: `"Ложка"` or `{n:"Баф", opt:true, desc:"..."}`
  (`opt` → "опц." badge, `desc` → small grey hint under the name).
  Category flags: `must:true`, `season:true`, `note:"..."`.
- **`routes`** — array `{name, area, height, duration, difficulty, days,
  image, desc, tip}`. `image` points to a file in `images/routes/`.
- **`routeApps`** — array `{name, url, desc}` (route-finding services).
- **`videos`** — array `{id, title, desc}` (`id` is the YouTube watch id).
- **`articles`** — array `{title, intro?, steps:[{t,d}], warnIntro?,
  warnings:[{t,d}]}`. Shown as collapsible cards in **Поради**. `steps` render
  as numbered green items, `warnings` as red "do NOT" items.
- **`gearExamples`** — array `{item, wrong, right, layer?}` for **Стаф**.
- **Безпека** is static HTML in the `id="safety"` section of `index.html`.

### Add a real route photo
1. Put the file in `images/routes/` (e.g. `parashka.jpg`).
2. Set `image: "images/routes/parashka.jpg"` on the route in `data.js`.
3. Add the new file to the `ASSETS` array in `sw.js` so it works offline.

> After **any** content change, bump the cache version in `sw.js`
> (`u-gory-vN` → `u-gory-v(N+1)`) so users get the fresh version. Current: `v9`.

## Versioning

Annotated semver tags + GitHub Releases mark restore points; feature branches
hold parallel work. `main` is always deployable. Commit messages and release
notes are in English; UI/content is in Ukrainian.

```
git tag -a vX.Y.Z -m "..." && git push --tags
gh release create vX.Y.Z --latest --title "..." --notes "..."
```

## Technical notes

- Checklist state is stored in `localStorage` (separately for 1 and 2 days).
- YouTube videos don't open offline — the app hints about this.
- Content lives in `data.js` (not `data.json`) on purpose: it also works when
  opening the file by double-click, with no server (avoids `fetch`/CORS over
  `file://`).
