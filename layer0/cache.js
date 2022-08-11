const ONE_HOUR = 60 * 60
const ONE_DAY = 60 * 60 * 24
const ONE_YEAR = ONE_DAY * 365

export const foreverEdge = {
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: ONE_YEAR,
  },
  edge: {
    maxAgeSeconds: ONE_YEAR,
    staleWhileRevalidateSeconds: 0,
  },
}

export const assetCache = {
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: ONE_YEAR,
  },
  edge: {
    maxAgeSeconds: ONE_YEAR,
    staleWhileRevalidateSeconds: 0,
    forcePrivateCaching: true,
  },
}

export const nextCache = {
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: ONE_HOUR,
  },
  edge: {
    maxAgeSeconds: ONE_HOUR,
    staleWhileRevalidateSeconds: 0,
  },
}
