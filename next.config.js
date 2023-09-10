module.exports = {
  output: 'standalone',
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.com',
      },
      {
        protocol: 'https',
        hostname: '**.in',
      },
      {
        protocol: 'https',
        hostname: '**.link',
      },
      {
        protocol: 'https',
        hostname: '**.app',
      },
      {
        protocol: 'https',
        hostname: 'placehold.jp',
      },
      {
        protocol: 'https',
        hostname: 'placehold.jp',
      },
    ],
  },
}
