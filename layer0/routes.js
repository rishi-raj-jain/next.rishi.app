const { join } = require('path')
const { globbySync } = require('globby')
const { Router } = require('@layer0/core/router')
const { assetCache, nextCache } = require('./cache.js')
const { isProductionBuild } = require('@layer0/core/environment')

// Create a new router
const router = new Router()

// Block crawlers on Layer0 permalinks
router.noIndexPermalink()

// Serve the compiled service worker with Layer0 prefetcher working
router.match('/service-worker.js', ({ serviceWorker }) => {
  serviceWorker('dist/service-worker.js')
})

// Re-Route xdn requests to layer0
router.match('/__xdn__/:path*', ({ redirect }) => {
  redirect('/__layer0__/:path*', 301)
})

// Cache assets
if (isProductionBuild()) {
  // Crawl through the public directory present in the dist folder of the AWS lambda
  globbySync(join(process.cwd(), 'dist', 'public', '**', '*')).forEach((i) => {
    router.match(i.replace(join(process.cwd(), 'dist', 'public'), ''), ({ cache }) => {
      cache(assetCache)
    })
  })
  router.match('/_next/static/:path*', ({ cache }) => {
    cache(assetCache)
  })
}

// Disable cross origin fetch of /api route
router.match('/api/:path*', ({ setResponseHeader }) => {
  setResponseHeader('Access-Control-Allow-Origin', 'https://rishi.app')
})

// Caching the Next.js optimized images forever
router.match('/_next/image/:path*', ({ cache, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('set-cookie')
  cache(assetCache)
})

// Caching the Next.js data props
router.match('/_next/data/:build/blog/:name.json', ({ cache }) => {
  cache(nextCache)
})
router.match('/_next/data/:build/:name.json', ({ cache }) => {
  cache(nextCache)
})

// Cache the pages for a minute
const pages = ['/', '/about', '/blogs', '/videos', '/cv', '/storyblok', '/blog/:path*']
pages.forEach((i) => {
  router.match(i, ({ cache, removeUpstreamResponseHeader }) => {
    removeUpstreamResponseHeader('cache-control')
    cache(nextCache)
  })
})

// Default Next.js Routes
router.fallback(({ renderWithApp }) => {
  renderWithApp()
})

module.exports = router
