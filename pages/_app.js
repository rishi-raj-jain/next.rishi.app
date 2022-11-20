import Home from 'pages'
import '@/styles/global.css'
import Post from './blog/[slug]'
import Layer0RUM from 'edgio/rum'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'
import Description from '@/components/Description'
import AboutWithFallback from '@/components/About'
import BlogFallback from '@/components/Fallback/Blogs'
import { install, prefetch } from '@edgio/prefetch/window'

if (process.env.NODE_ENV == 'production') {
  Layer0RUM('16dbca52-84e4-4087-96d7-1d0aab0c4421')
}

const fallbackMap = {
  '/': <Home />,
  '/cv': <Description />,
  '/storyblok': <Description />,
  '/blogs': <BlogFallback subHead="Recommended Posts" heading="Blogs" />,
  '/about': <AboutWithFallback heading="About Me" description="My Timeline" />,
}

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [changingTo, setChangingTo] = useState('')
  useEffect(() => {
    install()
    prefetch('/css/dark.css', 'fetch', { maxAgeSeconds: 24 * 60 * 60 })
    prefetch('/css/light.css', 'fetch', { maxAgeSeconds: 24 * 60 * 60 })
    document.querySelectorAll('link').forEach((i) => {
      if (i.href) {
        prefetch(i.href, 'fetch', { maxAgeSeconds: 24 * 60 * 60 })
      }
    })
    document.querySelectorAll('script').forEach((i) => {
      if (i.src) {
        prefetch(i.src, 'fetch', { maxAgeSeconds: 24 * 60 * 60 })
      }
    })
    document.querySelectorAll('img').forEach((i) => {
      if (i.src) {
        prefetch(i.src, 'fetch', { maxAgeSeconds: 24 * 60 * 60 })
      }
      if (i.srcset) {
        i.srcset.split(',').forEach((j) => {
          prefetch(j.trim(), 'fetch', { maxAgeSeconds: 24 * 60 * 60 })
        })
      }
    })
    const handleRouteChange = (url, { shallow }) => {
      setLoading(true)
      if (url.match('/blog/+')) {
        fallbackMap[url] = <Post />
      }
      setChangingTo(url)
      console.log(`App is changing to ${url} ${shallow ? 'with' : 'without'} shallow routing`)
    }
    const handleRouteComplete = (url, { shallow }) => {
      setChangingTo('')
      setLoading(false)
    }
    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [])
  return (
    <ThemeProvider attribute="class">
      <div className="flex flex-col items-center bg-white font-display text-black transition-colors duration-200 dark:bg-black dark:text-gray-200">
        <Navbar />
        <div className="flex w-full max-w-[90vw] flex-col py-10 sm:px-10 lg:max-w-[75vw]">
          {loading && fallbackMap.hasOwnProperty(changingTo) ? fallbackMap[changingTo] : <Component {...pageProps} />}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
