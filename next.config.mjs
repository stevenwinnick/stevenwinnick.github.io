/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a static site into `out/` for GitHub Pages (no server at runtime).
  output: "export",
  // Emit each route as its own `<route>/index.html` so a static file host
  // resolves paths like `/about/` on direct navigation and refresh.
  trailingSlash: true,
  // Static export has no server to run Next.js image optimization, so serve
  // images as-is.
  images: { unoptimized: true },
};

export default nextConfig;
