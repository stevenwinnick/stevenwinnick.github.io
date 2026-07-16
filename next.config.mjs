/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a static site into `out/` for GitHub Pages (no server at runtime).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
