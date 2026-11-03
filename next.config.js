/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `npm run build` writes plain HTML/CSS/JS to ./out,
  // which nginx serves (see Dockerfile). No Node server in production.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
