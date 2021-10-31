import '@/styles/global.css'
import { Metrics } from '@layer0/rum'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from 'next-themes'
import { Fragment, useEffect, useState } from 'react'

const MyApp = ({ Component, pageProps }) => {
  const [media, setMedia]= useState('print')
  useEffect(() => {
    setMedia('all')
    if (process.env.NODE_ENV == 'production') {
      new Metrics({
        token: '9d02f940-a21a-4f30-adfc-a042990c593a',
      }).collect()
    }
  }, [])

  return <Fragment>
    <link
      media={media}
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
    />
    <ThemeProvider attribute="class">
      <div className="transition-colors duration-200 bg-white dark:bg-black text-black dark:text-gray-200 font-display flex flex-col items-center">
        <Navbar />
        <div className="py-10 w-full max-w-[90vw] lg:max-w-[75vw] sm:px-10 flex flex-col">
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  </Fragment>
}

export default MyApp
