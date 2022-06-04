export const foreverEdge = {
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60 * 60 * 60 * 365,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 60 * 365,
  },
}

export const assetCache = {
  edge: {
    maxAgeSeconds: 60 * 60 * 60 * 365,
    forcePrivateCaching: true,
  },
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60 * 60 * 24,
  },
}

export const nextDataCache = {
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60,
  },
  edge: {
    maxAgeSeconds: 60,
  },
}

export const nextCache = (swrSeconds = 0) => ({
  browser: {
    serviceWorkerSeconds: swrSeconds,
  },
  edge: {
    maxAgeSeconds: 60,
    staleWhileRevalidateSeconds: swrSeconds,
  },
})
