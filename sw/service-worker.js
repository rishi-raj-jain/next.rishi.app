import { Prefetcher } from '@layer0/prefetch/sw'
import { precacheAndRoute } from 'workbox-precaching'
import { skipWaiting, clientsClaim } from 'workbox-core'
import DeepFetchPlugin from '@layer0/prefetch/sw/DeepFetchPlugin'

skipWaiting()
clientsClaim()
precacheAndRoute(self.__WB_MANIFEST || [])

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      {
        selector: 'script',
        maxMatches: 10,
        attribute: 'src',
        as: 'script',
        callback: deepFetchAssets,
      },
      {
        selector: '[rel="stylesheet"]',
        maxMatches: 10,
        attribute: 'href',
        as: 'style',
        callback: deepFetchAssets,
      },
      {
        selector: '[rel="preload"]',
        maxMatches: 10,
        attribute: 'href',
        as: 'style',
        callback: deepFetchAssets,
      },
    ]),
  ],
}).route()

function deepFetchAssets({ $el, el, $ }) {
  let urlTemplate = $(el).attr('href')
  if (urlTemplate) {
    prefetch(urlTemplate)
  }
  urlTemplate = $(el).attr('src')
  if (urlTemplate) {
    prefetch(urlTemplate)
  }
}
