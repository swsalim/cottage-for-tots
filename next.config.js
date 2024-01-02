const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'stats.cottagefortots.com', port: '' },
    ],
  },
};

module.exports = withContentlayer(nextConfig);
