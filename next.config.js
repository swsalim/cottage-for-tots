/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['stats.cottagefortots.com.com'],
  },
};

module.exports = nextConfig;
