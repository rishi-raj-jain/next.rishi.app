export const weekday = new Array(7)
weekday[0] = 'Sunday'
weekday[1] = 'Monday'
weekday[2] = 'Tuesday'
weekday[3] = 'Wednesday'
weekday[4] = 'Thursday'
weekday[5] = 'Friday'
weekday[6] = 'Saturday'

export const month = new Array()
month[0] = 'January'
month[1] = 'February'
month[2] = 'March'
month[3] = 'April'
month[4] = 'May'
month[5] = 'June'
month[6] = 'July'
month[7] = 'August'
month[8] = 'September'
month[9] = 'October'
month[10] = 'November'
month[11] = 'December'

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const getOrigin = (req) => {
  let origin
  if (typeof window !== 'undefined') {
    origin = window.location.origin
  }
  if (req) {
    let hostURL = req.headers['host']
    if (hostURL) {
      hostURL = hostURL.replace('http://', '').replace('https://', '')
      if (hostURL.includes('localhost:') || hostURL.includes('127.0.0.1')) {
        origin = `http://${hostURL}`
      } else {
        origin = `https://${hostURL}`
      }
    }
  }
  return origin
}

/**
 * Referenced from @edgio/next/client
 * Creates the URL that Next.js will use to fetch data from getServerSideProps
 * So for example, if you have a file /products/[productId].js,
 * you would call createNextDataURL({ href: '/products/1', routeParams: { productId: '1' }}).
 * This function will only return a value on the client. It will return undefined on the server.
 *
 * Example usage with @edgio/react/Prefetch:
 *
 * ```js
 *  import { Prefetch } from '@edgio/react'
 *  import { createNextDataURL } from '../lib/helpers'
 *
 *  <Link href={product.url}>
 *    <Prefetch url={createNextDataURL({ href: product.url, routeParams: { productId: product.id } })}>
 *      <a>Red Shirt</a>
 *    </Prefetch>
 *  </Link>
 * ```
 */

export const createNextDataURL = (params) => {
  let { href, routeParams = {}, locale } = params
  if (typeof __NEXT_DATA__ != 'undefined') {
    if (href.endsWith('/')) {
      href += 'index'
    }
    let qs = ''
    if (routeParams) {
      const keys = Object.keys(routeParams)
      if (keys.length) {
        qs = '?' + keys.map((key) => `${key}=${encodeURIComponent(routeParams[key])}`).join('&')
      }
    }
    const localeParam = locale ? `/${locale}` : ''
    console.log(`/_next/data/${__NEXT_DATA__.buildId}${localeParam}${href}.json${qs}`)
    return `/_next/data/${__NEXT_DATA__.buildId}${localeParam}${href}.json${qs}`
  } else {
    return undefined
  }
}
