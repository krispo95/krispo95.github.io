# krispo95.github.io

Personal link page for [Kristina Stupnikova](https://krispo95.github.io/) — the page
the Instagram bio points at. Static HTML/CSS/JS, no build step, served by GitHub
Pages from `main` at the repository root.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole page. English is the source language. |
| `styles.css` | Design tokens at the top; mobile-first. Light only — there is no dark theme, by choice. |
| `app.js` | EN/RU switch. Russian strings live in `STRINGS.ru`; the choice is kept in `localStorage`. |
| `assets/` | Portrait, app icons, screenshots (WebP), favicon, Open Graph card. |

## Editing the links

The outbound links are plain `href`s in `index.html` so they keep working with
JavaScript off. They appear **twice** — once in the hero, once in the "Let's
connect" block — so change both:

- Instagram — `https://www.instagram.com/krispo_moments`
- TikTok — `https://www.tiktok.com/@krispo_moments` (one account, both languages)
- GitHub — `https://github.com/krispo95`
- Email — `mailto:krispo.dev@gmail.com`
- Formora — App Store id `6781046163`
- Medistory — App Store id `6797866671`

### Links that change with the language

Instagram and the two App Store buttons point somewhere different in Russian.
Those anchors carry `data-href-en` and `data-href-ru`; `app.js` swaps `href`
when the language changes, and `href` itself holds the English URL so it still
works without JavaScript.

- Instagram: `krispo_moments` (EN) / `life_of_krispo` (RU)
- App Store: `?pt=129030541&ct=inst_header_en&mt=8` / `…_ru&mt=8`

The phone screenshots switch too, through `data-src-en` / `data-src-ru`.

`pt` is the provider token for the App Store Connect account (the same one owns
both apps); `ct` is the campaign token that separates the two audiences in App
Analytics. The links carry no country code, so Apple sends each visitor to
their own storefront.

## Language in the link

`?lang=ru` or `?lang=en` sets the language on arrival, which is how the two
Instagram profiles point here:

- https://krispo95.github.io/?lang=ru
- https://krispo95.github.io/?lang=en

The parameter wins over the visitor's saved choice and over their browser
language — it is the author of the link deciding. Case and a region subtag are
tolerated (`RU-ru` works), anything unrecognised falls through to the normal
order: saved choice, then browser language, then English. Clicking the switch
rewrites the parameter with `history.replaceState`, so a copied URL carries
what is on screen; other query parameters are left alone.

`<link rel="alternate" hreflang>` declares both variants plus an `x-default`.

## Editing the copy

Every translatable string sits in `index.html` with a `data-i18n="key"` attribute
and in both dictionaries in `app.js`. Change a string in **both** places —
`index.html` is what a visitor without JavaScript sees.

## Light only

There is no `prefers-color-scheme: dark` block and the page declares
`color-scheme: light`, so it stays on warm paper even when the phone is in
dark mode. That is deliberate — don't add a dark theme back without asking.

The cream is carrying a fine SVG grain (`body::before`) because flat cream
renders as dull grey on a phone. Shadows are warm-tinted rather than grey:
on this background a neutral grey shadow reads as dirt.

## The hero has two layouts

On a phone it is one centred column: round photo, then the name. From 780px
it becomes two, type left and a large photo right, as in the reference design.
The DOM order is photo-then-text because that is what the phone needs; the
wide layout flips it with `order`, so there is one piece of markup, not two.

## The portrait

`assets/kristina.webp` is a 400x400 square crop of a phone photo, shown through
`#blobShape` — a clip path traced from an outline Kristina drew. The trace ran
the drawing through boundary following, Ramer-Douglas-Peucker down to 49 points
and a Catmull-Rom smoothing pass; the result is in the SVG sprite in
`index.html`, in `objectBoundingBox` units, so it scales with the element.

The shape is 1.037:1 — give the element that ratio or it comes out squashed.

A clip path takes the `box-shadow` with it, so the shadow is a
`filter: drop-shadow` on `.avatar` while the clip sits on the `<img>` inside.
A `url()` clip cannot be animated between shapes, so the old morph is gone.

Exported at 560x540, the shape's own ratio.

A cold window frame runs down the whole left side of the source photo and there
is no clean wall beside it to extend, so the crop starts to the right of it —
left edge at x=1070 in the original. That is what sets how far the crop can
zoom out: widen it leftwards and the window comes back inside the outline.
Check that against the mask, not the rectangle; the two disagree.

To swap it, crop to 1.037:1, export at 560px wide, keep the filename.

## Screenshots

Two per app per language, in `assets/<app>-<n>.<lang>.webp`.

Formora's come from `formora pics/marketing screens/shots/{en,ru}/`: `1.png`
is the weight chart with the cycle overlay switched on, `2.png` the home
screen. Medistory's come from its `screenshots/{en,ru}/`. Same screen in both
languages, or the switch looks like a bug.

`<app>-1` is the front phone, `<app>-2` the one behind it.

Each one is resized to 440px wide and **cropped to 700px tall**. Only the top of
a screenshot is ever on screen — the card clips the rest — and the widest layout
shows about 580 source pixels, so 700 leaves room to spare. The uniform height
matters: it gives every image the same aspect ratio, so switching language
cannot reflow the card.

To refresh them, re-export at 440x700 from the top. The bezel around them is
2px of `--text`, enough to contain the screenshot without pretending to be a
phone.

## Cache: bump `?v=` when you change CSS or JS

GitHub Pages serves everything with `Cache-Control: max-age=600`, the HTML
included. For ten minutes after a deploy a returning visitor keeps the old
copy — and can end up with new HTML against a stale `app.js`, which breaks in
confusing ways rather than just looking out of date.

So every asset URL in `index.html` carries `?v=N` — stylesheet, script,
images, favicon, the Open Graph card, and the `data-src-en` / `data-src-ru`
pairs the language switch uses. **Raise N whenever you change any of them.** A
new query string is a new URL, so the moment the HTML refreshes it pulls the
new file instead of the cached one.

Images matter most here, because their filenames never change. Replace
`kristina.webp` without bumping N and a returning visitor keeps the old
portrait for ten minutes while the file on the server is already the new one —
which looks exactly like a deploy that failed.

If a change does not show up on the live page, that is this cache, not a broken
deploy. Confirm with `curl https://krispo95.github.io/app.js | grep ...` — if
the server has it, just wait, or hard-reload.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
