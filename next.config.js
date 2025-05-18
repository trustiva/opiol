/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['opiol.vercel.app'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig 