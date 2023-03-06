/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chart.googleapis.com',
        port: '',
        pathname: '/chart',
      },
    ],
  },
}

module.exports = nextConfig
