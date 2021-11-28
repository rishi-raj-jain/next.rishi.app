exports.foreverEdge = {
  browser: false,
  edge: {
    staleWhileRevalidateSeconds: 1,
    maxAgeSeconds: 60 * 60 * 60 * 365,
  },
}

exports.assetCache = {
  edge: {
    maxAgeSeconds: 60 * 60 * 60 * 365,
    forcePrivateCaching: true,
  },
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60 * 60 * 24,
  },
}

exports.NEXT_CACHE_HANDLER = ({ removeUpstreamResponseHeader, cache }) => {
  removeUpstreamResponseHeader('cache-control')
  cache({
    browser: {
      maxAgeSeconds: 0,
      serviceWorkerSeconds: 60,
    },
    edge: {
      maxAgeSeconds: 60,
    },
  })
}
