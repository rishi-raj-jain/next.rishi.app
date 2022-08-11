module.exports = {
  output: 'standalone',
  images: { domains: ['localhost', 'a.storyblok.com', 'rishi-raj-jain-html-og-image-default.layer0-limelight.link'] },
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
}
