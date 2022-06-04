export const foreverEdge = {
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60 * 60 * 60 * 365,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 60 * 365,
    staleWhileRevalidateSeconds: 0,
  },
}

export const assetCache = {
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60 * 60 * 60 * 365,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 60 * 365,
    staleWhileRevalidateSeconds: 0,
    forcePrivateCaching: true,
  },
}

export const nextCache = {
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60,
  },
  edge: {
    maxAgeSeconds: 60,
    staleWhileRevalidateSeconds: 0,
  },
}
