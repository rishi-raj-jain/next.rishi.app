const { join } = require('path')
const { globbySync } = require('globby')
const { getAllPostsForHome } = require('@/lib/api.js')
const { assetCache, nextCache } = require('./cache.js')
const { Router, CustomCacheKey } = require('@edgio/core/router')
const { isProductionBuild } = require('@edgio/core/environment')

// Create a new router
const router = new Router({ indexPermalink: true })

router.prerender(async () => {
  const blogs = await getAllPostsForHome()
  const nonDynamicPaths = ['/', '/cv', '/about', '/blogs', '/storyblok']
  return [...blogs.map((i) => ({ path: `/blog/${i.slug}` })), ...nonDynamicPaths.map((i) => ({ path: i }))]
})

// Serve the compiled service worker with Layer0 prefetcher working
router.match('/service-worker.js', ({ serviceWorker }) => {
  serviceWorker('.edgio_temp/service-worker.js')
})

// Cache assets
if (isProductionBuild()) {
  // Crawl through the public directory present in the dist folder of the AWS lambda
  globbySync(join(process.cwd(), 'dist', 'public', '**', '*')).forEach((i) => {
    router.match(i.replace(join(process.cwd(), 'dist', 'public'), ''), ({ cache, removeUpstreamResponseHeader }) => {
      removeUpstreamResponseHeader('set-cookie')
      removeUpstreamResponseHeader('cache-control')
      cache(assetCache)
    })
  })
  router.match('/_next/static/:path*', ({ cache, removeUpstreamResponseHeader }) => {
    removeUpstreamResponseHeader('set-cookie')
    removeUpstreamResponseHeader('cache-control')
    cache(assetCache)
  })
}

// Disable cross origin fetch of /api route
router.match('/api/:path*', ({ setResponseHeader }) => {
  setResponseHeader('Access-Control-Allow-Origin', 'https://next.rishi.app')
})

// Caching the Next.js optimized images forever
router.match('/_next/image/:path*', ({ cache, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('set-cookie')
  removeUpstreamResponseHeader('cache-control')
  cache(assetCache)
})

// Caching the Next.js data props
router.match('/_next/data/:build/blog/:name.json', ({ cache, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('set-cookie')
  removeUpstreamResponseHeader('cache-control')
  cache({ ...nextCache, key: new CustomCacheKey().excludeQueryParameters('edgio_prefetch', 'edgio_dt_pf') })
})
router.match('/_next/data/:build/:name.json', ({ cache, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('set-cookie')
  removeUpstreamResponseHeader('cache-control')
  cache({ ...nextCache, key: new CustomCacheKey().excludeQueryParameters('edgio_prefetch', 'edgio_dt_pf') })
})

// Cache the pages for a minute
const pages = ['/', '/about', '/blogs', '/cv', '/storyblok', '/blog/:path*']
pages.forEach((i) => {
  router.match(i, ({ cache, removeUpstreamResponseHeader }) => {
    removeUpstreamResponseHeader('set-cookie')
    removeUpstreamResponseHeader('cache-control')
    cache(nextCache)
  })
})

// Default Next.js Routes
router.fallback(({ renderWithApp }) => {
  renderWithApp()
})

module.exports = router
