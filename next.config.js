/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.atcoder.jp',
      },
    ]
  },
}

module.exports = nextConfig
