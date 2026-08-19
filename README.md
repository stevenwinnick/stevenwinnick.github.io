# stevenwinnick.com

Steven Winnick's personal website, built with [Next.js](https://nextjs.org) (App Router) and [Tailwind CSS](https://tailwindcss.com), and deployed as a static site to GitHub Pages.

## Tech stack

- Next.js 16 (App Router) with a fully static export (`output: "export"`)
- React 19 and TypeScript
- Tailwind CSS v4 (CSS-first configuration in `app/globals.css`)

## Local development

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Building the static site

```bash
npm run build   # emits the static site into `out/`
npm run serve   # serves the built `out/` directory locally
```

## Project structure

- `app/` — routes (App Router); `app/layout.tsx` wraps every route in `SiteChrome`, so pages render only their own content
- `components/` — shared UI (`SiteChrome`, `SiteHeader`, `SiteFooter`, `Heading`, `ModuleImage`, `FillingLink`, `ProjectSection`, `WavesCanvas`)
- `data/` — the project list (`projects.tsx`, whose optional `preview` field feeds the landing page) and the site's navigation and social links (`navigation.ts`)
- `app/globals.css` — Tailwind import, design tokens (`@theme`: the blue/white palette, fonts, `xs`–`xl` type scale, and the `--line`/`--grid-col`/`--grid-row` grid units), fonts, and the shared `page-grid`, column, line-height, and `fill-on-hover` utilities
- `public/` — static assets (images, fonts, `CNAME`, `.nojekyll`)

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages. The GitHub Pages source must be set to **GitHub Actions** in the repository settings (Settings → Pages → Build and deployment → Source).
