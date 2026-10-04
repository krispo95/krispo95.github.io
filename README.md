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
- TikTok — `https://www.tiktok.com/@TIKTOK_HANDLE`
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

`pt` is the provider token for the App Store Connect account (the same one owns
both apps); `ct` is the campaign token that separates the two audiences in App
Analytics. The links carry no country code, so Apple sends each visitor to
their own storefront.

## Editing the copy

Every translatable string sits in `index.html` with a `data-i18n="key"` attribute
and in both dictionaries in `app.js`. Change a string in **both** places —
`index.html` is what a visitor without JavaScript sees.

## Screenshots

Taken from the App Store screenshot folders of each app and resized to 440px wide
WebP. To refresh them, drop new PNGs in and re-export at the same width so the
phone frames keep their proportions.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
