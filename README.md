# krispo95.github.io

Personal link page for [Kristina Stupnikova](https://krispo95.github.io/) — the page
the Instagram bio points at. Static HTML/CSS/JS, no build step, served by GitHub
Pages from `main` at the repository root.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole page. English is the source language. |
| `styles.css` | Design tokens at the top; mobile-first, dark mode via `prefers-color-scheme`. |
| `app.js` | EN/RU switch. Russian strings live in `STRINGS.ru`; the choice is kept in `localStorage`. |
| `assets/` | App icons, screenshots (WebP), favicon, Open Graph card. |

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

## Editing the copy

Every translatable string sits in `index.html` with a `data-i18n="key"` attribute
and in both dictionaries in `app.js`. Change a string in **both** places —
`index.html` is what a visitor without JavaScript sees.

## Screenshots

Two per app per language, in `assets/<app>-<n>.<lang>.webp`, taken from the
App Store screenshot folders of each app (`.../screenshots/en|ru/`) and showing
the same two screens in both languages.

Each one is resized to 440px wide and **cropped to 700px tall**. Only the top of
a screenshot is ever on screen — the card clips the rest — and the widest layout
shows about 580 source pixels, so 700 leaves room to spare. The uniform height
matters: it gives every image the same aspect ratio, so switching language
cannot reflow the card.

To refresh them, re-export at 440x700 from the top, or the phone frames will
change shape.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
