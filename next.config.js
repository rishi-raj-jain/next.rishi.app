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
        hostname: '**.link',
      },
      {
        protocol: 'https',
        hostname: '**.app',
      },
    ],
  },
}
