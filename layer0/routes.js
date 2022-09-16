const { Router } = require('@layer0/core/router')
const { foreverEdge, assetCache, nextCache } = require('./cache.js')

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
router.static('public', {
  handler:
    (file) =>
    ({ cache }) => {
      cache(assetCache)
    },
})

// Disable cross origin fetch of /api route
router.match('/api/:path*', ({ setResponseHeader }) => {
  setResponseHeader('Access-Control-Allow-Origin', 'https://rishi.app')
})

// Caching the Next.js optimized images forever
router.match('/_next/image/:path*', ({ cache, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('set-cookie')
  cache(foreverEdge)
})

// Caching the Next.js data props
router.match('/_next/data/:build/blog/:name.json', ({ cache, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('cache-control')
  cache(nextCache)
})
router.match('/_next/data/:build/:name.json', ({ cache, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('cache-control')
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
