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
├── index.html              ← markup only; pulls in css/ + data.js + js/
├── data.js                 ← ALL CONTENT (edit this file)
├── css/
│   ├── base.css            ← tokens, reset, header, controls
│   ├── components.css      ← articles, section layout, checklist, cards
│   └── safety-nav.css      ← safety section, bottom nav, responsive
├── js/                     ← classic scripts, loaded in order (shared scope)
│   ├── state.js            ← data/language, service worker, helpers, state
│   ├── gear.js             ← checklist render + interaction
│   ├── controls.js         ← day / season / reset / filter controls
│   ├── render.js           ← section renderers (gear, videos, articles, …)
│   ├── i18n.js             ← language strings + language switch
│   └── main.js             ← tabs, data check, bootstrap (loaded LAST)
├── sw.js                   ← offline cache (service worker)
├── manifest.json           ← PWA settings
└── images/
    ├── icons/              ← app icons & favicon (PWA + browser tab)
    │   ├── favicon.png, apple-touch-icon.png
    │   └── icon-192.png, icon-512.png, icon-maskable-512.png
    └── routes/             ← route photos/illustrations
        ├── parashka.svg
        └── hora_lopata.jpg
```

No build step. CSS is split into plain `.css` files (linked in order) and JS
into plain classic scripts that share one global scope (load order matters —
`main.js` last). This keeps double-click `file://` opening working. All images
are grouped by purpose under `images/`; add folders (e.g. `images/gear/`) as
new content types appear. After adding any `css/` or `js/` file, list it in the
`ASSETS` array in `sw.js`.

## Run locally

Double-click `index.html` — the design and checklist work fully over `file://`.

> PWA offline caching and "install to phone" only activate over `https://`
> (i.e. on GitHub Pages) or a local server (`python3 -m http.server`).

A tiny dev server for live preview lives in `.claude/` (git-ignored) — not part
of the app.

## Deploy (GitHub Pages)

Already set up: **Settings → Pages → Deploy from a branch**, branch `main`,
folder `/ (root)`. Every push to `main` rebuilds the live site automatically.

## Languages (i18n)

The app is bilingual (Ukrainian + English) with a `UA | EN` switch in the
header; the choice is saved in `localStorage`. Content is keyed by language:

```js
window.MOUNTAIN_DATA = { uk: { …all content… }, en: { …all content… } };
```

Each language block has the same set of keys (`ui`, `gear`, `routes`,
`routeApps`, `videos`, `articles`, `gearExamples`, `safety`). **Keep the
structure identical across languages** — checklist state is saved by position
(day › category index › item index), so the checkmarks carry over when you
switch language.

**Add a language:** copy the `uk` block, change the key (e.g. `pl`), translate
the values, and add a button `<button data-lang="pl">PL</button>` to
`.lang-switch` in `index.html`.

## Editing content (`data.js`)

No coding needed — just change text between the quotes (inside the right
language block). In `safety`/`articles` text, `**double asterisks**` render as
**bold**.

- **`ui`** — all interface strings (tabs, buttons, headings, messages).
- **`gear`** — object keyed by `"1"` and `"2"` (days). Each is an array of
  categories. Item: `"Ложка"` or `{n:"Баф", opt:true, desc:"..."}`
  (`opt` → "опц." badge, `desc` → small grey hint under the name).
  Category flags: `must:true`, `season:true`, `note:"..."`.
- **`routes`** — array `{name, area, height, duration, difficulty, days,
  image, desc, tip}`. `image` points to a file in `images/routes/`.
- **`routeApps`** — array `{name, url, desc}` (route-finding services).
- **`videos`** — array `{id, title, desc}` (`id` is the YouTube watch id).
- **`articles`** — array `{title, intro?, steps:[{t,d}], warnIntro?,
  warnings:[{t,d}]}`. Shown as collapsible cards in **Advice**. `steps` render
  as numbered green items, `warnings` as red "do NOT" items.
- **`gearExamples`** — array `{item, wrong, right, layer?}` for the **Gear** tab.
- **`safety`** — `{lead, emergency:{title, numbers:[{n,who,alt?}], notes:[]},
  cards:[{title, items:[]}], footnote}`. Rendered into the Safety tab.

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
