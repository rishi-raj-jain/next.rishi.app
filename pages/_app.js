import '@/styles/global.css'
import { useEffect } from 'react'
import { Metrics } from '@layer0/rum'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from 'next-themes'
import { prefetch } from '@layer0/prefetch/window/prefetch'

if (process.env.NODE_ENV == 'production') {
  new Metrics({
    token: '16dbca52-84e4-4087-96d7-1d0aab0c4421',
  }).collect()
}

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // register a listener for SW messages to prefetch images from the PLP API responses
    const { serviceWorker } = navigator
    if (serviceWorker) {
      serviceWorker.addEventListener('message', (event) => {
        if (event.data.action === 'prefetch') {
          prefetch(event.data.url, event.data.as, event.data.options)
        }
      })
    }
  }, [])

  return (
    <ThemeProvider attribute="class">
      <div className="transition-colors duration-200 bg-white dark:bg-black text-black dark:text-gray-200 font-display flex flex-col items-center">
        <Navbar />
        <div className="py-10 w-full max-w-[90vw] lg:max-w-[75vw] sm:px-10 flex flex-col">
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default MyApp
