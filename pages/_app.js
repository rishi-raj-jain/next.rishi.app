import '@/styles/global.css'
import { useEffect } from 'react'
import Layer0RUM from 'layer0/rum'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from 'next-themes'
import { install } from '@layer0/prefetch/window'

if (process.env.NODE_ENV == 'production') {
  Layer0RUM('16dbca52-84e4-4087-96d7-1d0aab0c4421')
}

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    install()
  }, [])
  return (
    <ThemeProvider attribute="class">
      <div className="flex flex-col items-center bg-white font-display text-black transition-colors duration-200 dark:bg-black dark:text-gray-200">
        <Navbar />
        <div className="flex w-full max-w-[90vw] flex-col py-10 sm:px-10 lg:max-w-[75vw]">
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default MyApp
