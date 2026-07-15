/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site into `out/` so it can be served by GitHub Pages.
  output: "export",

  // GitHub Pages serves static files, so append a trailing slash to route
  // paths (e.g. `/about/`) and emit each route as its own `index.html`.
  trailingSlash: true,

  // The static export has no server, so Next.js image optimization must be
  // disabled; images are served as-is from `public/`.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
