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
- `app/globals.css` — global shared CSS
- `public/` — static assets (images, fonts, `CNAME`, `.nojekyll`)

## Images

The static export runs no image optimization, so every file in `public/img` is served exactly as it is committed and has to be prepared before it lands here:

- **Cropped to its slot on the grid.** `ModuleImage` renders a photograph in one 4:3 module, or with `tall` in a portrait two module rows deep, which the grid makes 16:25. The file is cropped to that ratio and the component derives the dimensions from it, so no image carries its own width and height
- **Capped at 1600 px on the long edge**, roughly 2x the widest a module ever renders. A source smaller than that is left alone rather than upscaled
- **WebP at quality 80**, with metadata stripped. Icons painted as CSS masks are SVG, where only the shape matters
- **Named for what it belongs to**, in kebab-case, flat in `public/img`. A project's photograph takes the project's own `id` from `data/projects.tsx`

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages. The GitHub Pages source must be set to **GitHub Actions** in the repository settings (Settings → Pages → Build and deployment → Source).
