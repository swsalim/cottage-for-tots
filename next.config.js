const { withContentlayer } = require('next-contentlayer')

const redirectList = [
  { source: '/get/simpleanalytics', destination: 'https://referral.simpleanalytics.com/yuyu' },
]

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
  async redirects() {
    return redirectList.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
      statusCode: 301,
    }));
  },
}



module.exports = withContentlayer(nextConfig)
