import '@/styles/global.css'
import Layer0RUM from 'layer0/rum'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'
import { install } from '@layer0/prefetch/window'
import Description from '@/components/Description'
import AboutWithFallback from '@/components/About'
import BlogFallback from '@/components/Fallback/Blogs'

if (process.env.NODE_ENV == 'production') {
  Layer0RUM('16dbca52-84e4-4087-96d7-1d0aab0c4421')
}

const fallbackMap = {
  '/blogs': <BlogFallback subHead="Recommended Posts" heading="Blogs" />,
  '/storyblok': <Description />,
  '/cv': <Description />,
  '/about': <AboutWithFallback heading="About Me" description="My Timeline" />,
}

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [changingTo, setChangingTo] = useState('')
  useEffect(() => {
    install()
    const handleRouteChange = (url, { shallow }) => {
      setLoading(true)
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
