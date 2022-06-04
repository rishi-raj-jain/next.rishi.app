const { withLayer0, withServiceWorker } = require('@layer0/next/config')

const nextConfig = {
  target: 'server',
  env: {
    STORYBLOK_API_KEY: process.env.STORYBLOK_API_KEY,
  },
  images: { domains: ['a.storyblok.com', 'rishi-raj-jain-html-og-image-default.layer0.link'] },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }
    return config
  },
  layer0SourceMaps: true,
  disableLayer0DevTools: true,
}

module.exports = withLayer0(withServiceWorker(nextConfig))
