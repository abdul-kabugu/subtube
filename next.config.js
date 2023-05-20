/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.subsocial.network',
        port: '',
       // pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig
