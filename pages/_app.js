import '@/styles/global.css'
import { Metrics } from '@layer0/rum'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'

if (process.env.NODE_ENV == 'production') {
  new Metrics({
    token: '16dbca52-84e4-4087-96d7-1d0aab0c4421',
  }).collect()
}

const MyApp = ({ Component, pageProps }) => {
  const [media, setMedia] = useState('print')
  useEffect(() => {
    setMedia('all')
  }, [])

  return (
    <ThemeProvider attribute="class">
      <div className="flex flex-col items-center bg-white font-display text-black transition-colors duration-200 dark:bg-black dark:text-gray-200">
        <Navbar />
        <div className="flex w-full max-w-[90vw] flex-col py-10 sm:px-10 lg:max-w-[75vw]">
          <Component {...pageProps} />
        </div>
      </div>
      <link as="font" media={media} type="font/woff2" crossOrigin="anonymous" href="/fonts/inter-var.woff2" />
    </ThemeProvider>
  )
}

export default MyApp
