import '@/styles/global.css'
import { useEffect } from 'react'
import { Metrics } from '@layer0/rum'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from 'next-themes'

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV == 'production') {
      new Metrics({
        token: '9d02f940-a21a-4f30-adfc-a042990c593a',
      }).collect()
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
