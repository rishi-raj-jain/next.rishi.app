import '@/styles/global.css'
import { useEffect } from 'react'
import { Metrics } from '@layer0/rum'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from 'next-themes'
import { install, prefetch } from '@layer0/prefetch/window'

if (process.env.NODE_ENV == 'production') {
  new Metrics({
    token: '16dbca52-84e4-4087-96d7-1d0aab0c4421',
  }).collect()
}

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const prefetchCSS = () => {
      if (document.location.pathname.endsWith('blogs')) {
        prefetch('/css/dark.css')
        prefetch('/css/light.css')
        prefetch('/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F117912%2F30x30%2F11c98f9b8f%2Frishi.png&w=64&q=30')
      }
    }
    install({
      watch: [
        {
          selector: 'body',
          callback: (el) => {
            var oldHref = document.location.href
            var bodyList = document.querySelector('body')
            prefetchCSS()
            var observer = new MutationObserver(function (mutations) {
              mutations.forEach(function (mutation) {
                if (oldHref != document.location.href) {
                  oldHref = document.location.href
                  prefetchCSS()
                }
              })
            })
            var config = {
              childList: true,
              subtree: true,
            }
            observer.observe(bodyList, config)
          },
        },
      ],
    })
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
