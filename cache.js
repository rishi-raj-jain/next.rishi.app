exports.foreverEdge = {
  browser: false,
  edge: {
    staleWhileRevalidateSeconds: 1,
    maxAgeSeconds: 60 * 60 * 60 * 365
  },
}

exports.assetCache = {
  edge: {
    maxAgeSeconds: 60 * 60 * 24,
    forcePrivateCaching: true,
  },
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60 * 60 * 24,
  },
}
