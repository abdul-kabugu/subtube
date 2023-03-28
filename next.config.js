/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://ipfs.subsocial.network/ipfs/',
        port: '',
       // pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig
