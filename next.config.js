const { withLayer0, withServiceWorker } = require('@layer0/next/config')

const imageOptions = {
  domains: ['a.storyblok.com', 'rishi-raj-jain-html-og-image-default.layer0.link'],
}

const webPackOptions = (config, { dev, isServer }) => {
  // Replace React with Preact only in client production build
  if (!dev && !isServer) {
    Object.assign(config.resolve.alias, {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    })
  }
  return config
}

const __preLayer0Export = {
  reactStrictMode: true,
  layer0SourceMaps: true,
  images: imageOptions,
  webpack: webPackOptions,
}

if (process.env.NODE_ENV !== 'production') {
  imageOptions['domains'].push('localhost')
}

module.exports = withLayer0(withServiceWorker(__preLayer0Export))
