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

- `app/` — routes (App Router)
- `components/` — shared UI
- `data/` — shared data
- `app/globals.css` — global shared CSS: the design tokens and the grid utilities every page is built on
- `public/` — static assets (images, fonts, `CNAME`, `.nojekyll`)

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages. The GitHub Pages source must be set to **GitHub Actions** in the repository settings (Settings → Pages → Build and deployment → Source).
