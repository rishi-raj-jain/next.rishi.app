import { Fragment } from 'react'
import NextImage from 'next/image'
import SEO from '@/components/Seo'
import { getOrigin } from '@/lib/operations'
import { shimmer, toBase64 } from '@/lib/shimmer'
import SocialLinks from '@/components/social-links'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

const Home = ({ homeTagline, origin }) => {
  return (
    <Fragment>
      <SEO deploymentUrl={origin} canonical={origin} />
      <div className="md:justify-auto flex min-h-[90vh] flex-col justify-center md:flex-row md:items-center">
        <div className="flex w-full flex-col items-center justify-center md:w-1/2 md:items-start">
          <div className="filter md:hidden">
            <NextImage
              width={120}
              height={120}
              quality={30}
              placeholder="blur"
              className="rounded-full grayscale"
              src={`/static/favicon-image.jpg`}
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1400, 720))}`}
            />
          </div>
          <h1 className="mt-5 text-2xl font-bold sm:text-5xl md:mt-0">Rishi Raj Jain</h1>
          <h2 className="mt-5 text-center text-lg text-gray-500 dark:text-white sm:text-xl md:text-left">
            Solutions Architect - Technical Customer Success at Edgio
          </h2>
          <div className="flex flex-row space-x-5">
            <SocialLinks />
          </div>
          <div className="mt-10 h-[1px] w-full bg-gray-200 dark:bg-gray-700"></div>
          <h2
            dangerouslySetInnerHTML={{
              __html: new RichTextResolver().render(homeTagline),
            }}
            className="text-md mt-10 text-center text-gray-500 dark:text-white sm:text-lg md:text-left"
          ></h2>
        </div>
        <div className="hidden flex-col items-end justify-center md:flex md:w-1/2">
          <div className="grayscale filter">
            <NextImage
              width={330}
              height={440}
              quality={50}
              placeholder="blur"
              className="rounded object-cover"
              src={`${origin}/static/favicon-image.jpg`}
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1400, 720))}`}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Home

export async function getServerSideProps({ req }) {
  let origin = getOrigin(req)
  const resp = await fetch(`${origin}/api/home`)
  if (!resp.ok) return { notFound: true }
  const data = await resp.json()
  return {
    props: { ...data, origin },
  }
}
