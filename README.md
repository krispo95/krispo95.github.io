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

- Instagram — `https://www.instagram.com/INSTAGRAM_HANDLE`
- TikTok — `https://www.tiktok.com/@TIKTOK_HANDLE`
- GitHub — `https://github.com/krispo95`
- Email — `mailto:krispo.dev@gmail.com`
- Formora — `https://apps.apple.com/app/id6781046163`
- Medistory — `MEDISTORY_APPSTORE_URL`

App Store links are deliberately country-less; Apple redirects each visitor to
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
