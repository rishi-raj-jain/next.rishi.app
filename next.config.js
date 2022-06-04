// Import Layer0's Next Config
const { withLayer0, withServiceWorker } = require('@layer0/next/config')

// Set Next.js image domains
const imageOptions = {
  domains: ['a.storyblok.com', 'rishi-raj-jain-html-og-image-default.layer0.link'],
}

// Add localhost port in dev mode only
if (process.env.NODE_ENV !== 'production') {
  imageOptions['domains'].push('localhost')
  imageOptions['domains'].push('127.0.0.1')
}

// Replace React with Preact only in client production build
const webPackOptions = (config, { dev, isServer }) => {
  if (!dev && !isServer) {
    Object.assign(config.resolve.alias, {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    })
  }
  return config
}

// Wrapper for before Layer0 Service Worker
const __preLayer0Export = {
  target: 'server',
  images: imageOptions,
  webpack: webPackOptions,
  env: {
    STORYBLOK_API_KEY: process.env.STORYBLOK_API_KEY,
  },
  layer0SourceMaps: true,
  disableLayer0DevTools: true,
}

module.exports = withLayer0(withServiceWorker(__preLayer0Export))
