const ONE_MINUTE = 60

const ONE_HOUR = 60 * 60

const ONE_DAY = 60 * 60 * 24

const ONE_YEAR = ONE_DAY * 365

export const assetCache = {
  edge: {
    maxAgeSeconds: ONE_YEAR,
  },
  browser: false,
}

export const nextCache = {
  edge: {
    maxAgeSeconds: ONE_HOUR,
    staleWhileRevalidateSeconds: ONE_YEAR,
    forcePrivateCaching: true,
  },
  browser: false,
}
