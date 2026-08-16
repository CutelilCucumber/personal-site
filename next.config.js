/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Reverse-proxies the existing blog app under /blog so it lives
        // on the same domain. Swap BLOG_APP_ORIGIN for the real deployed
        // URL once the blog app is deployed (Northflank/Railway, not Vercel,
        // since it's a long-running server, not a static/serverless site).
        source: '/blog/:path*',
        destination: `${process.env.BLOG_APP_ORIGIN || 'https://REPLACE_WITH_BLOG_APP_URL'}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
