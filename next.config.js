const { withLayer0, withServiceWorker } = require('@layer0/next/config')

const imageOptions = {
  domains: ['a.storyblok.com', 'rishi-raj-jain-html-og-image-default.layer0.link'],
}

const __preLayer0Export = {
  reactStrictMode: true,
  layer0SourceMaps: true,
  images: imageOptions,
}

if (process.env.NODE_ENV !== 'production') {
  imageOptions['domains'].push('localhost')
}

module.exports = withLayer0(withServiceWorker(__preLayer0Export))
