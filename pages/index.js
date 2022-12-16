import Image from 'next/image'
import SEO from '@/components/Seo'
import { getTagline } from '@/lib/api'
import { getOrigin } from '@/lib/operations'
import { shimmer, toBase64 } from '@/lib/shimmer'
import SocialLinks from '@/components/social-links'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

export async function getServerSideProps({ req }) {
  let origin = getOrigin(req)
  let props = { origin }
  const data = await getTagline('home')
  if (data && data?.type) {
    props['data'] = new RichTextResolver().render(data)
  }
  if (!props.hasOwnProperty('data')) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }
  return { props }
}

const Home = ({ data = null, origin = 'https://next.rishi.app' }) => {
  return (
    <>
      <SEO canonical={origin} />
      <div className="md:justify-auto flex min-h-[90vh] flex-col justify-center md:flex-row md:items-center">
        <div className="flex w-full flex-col items-center justify-center md:w-1/2 md:items-start">
          <div className="filter md:hidden">
            <Image
              width={400}
              height={400}
              quality={30}
              placeholder="blur"
              alt="Rishi Raj Jain"
              src="/static/favicon-image.jpg"
              className="rounded-lg grayscale"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1400, 720))}`}
            />
          </div>
          <h1 className="mt-5 text-2xl font-bold sm:text-5xl md:mt-0">Rishi Raj Jain</h1>
          <h2 className="mt-5 text-center text-lg text-gray-500 dark:text-white sm:text-xl md:text-left">
            Technical Customer Success Manager at Edgio
          </h2>
          <div className="flex flex-row space-x-5">
            <SocialLinks />
          </div>
          <div className="mt-10 h-[1px] w-full bg-gray-200 dark:bg-gray-700"></div>
          {data && (
            <h2
              dangerouslySetInnerHTML={{
                __html: data,
              }}
              className="text-md mt-10 text-center text-gray-500 dark:text-white sm:text-lg md:text-left"
            ></h2>
          )}
          {!data && <h2 className="mt-5 w-1/2 animate-pulse bg-black/50 py-4 dark:bg-white/50" />}
        </div>
        <div className="hidden flex-col items-end justify-center md:flex md:w-1/2">
          <div className="grayscale filter">
            <Image
              width={330}
              height={440}
              quality={50}
              placeholder="blur"
              alt="Rishi Raj Jain"
              src="/static/favicon-image.jpg"
              className="rounded-lg object-cover"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1400, 720))}`}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
