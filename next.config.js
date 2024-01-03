const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'stats.cottagefortots.com', port: '' },
      { protocol: 'https', hostname: 'ik.imagekit.io', port: '' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = withContentlayer(nextConfig)
