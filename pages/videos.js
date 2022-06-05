import { Fragment } from 'react'
import SEO from '@/components/Seo'
import ReactPlayer from 'react-player'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

const Videos = ({ videoTagline = '', origin }) => {
  const SEODetails = {
    title: `Videos - Rishi Raj Jain`,
    canonical: `https://${origin}/videos`,
    deploymentUrl: `https://${origin}`
  }
  return (
    <Fragment>
      <SEO {...SEODetails} />
      <h1 className="text-2xl font-bold sm:text-5xl">Videos</h1>
      <h2
        dangerouslySetInnerHTML={{
          __html: new RichTextResolver().render(videoTagline),
        }}
        className="font-regular text-md mt-5 whitespace-pre-line dark:text-gray-400 sm:text-xl"
      />
      <div className="flex flex-row flex-wrap gap-10">
        <ReactPlayer width={320} height={250} url="https://www.youtube.com/watch?v=miMm7qGMqLw" />
        <ReactPlayer width={320} height={250} url="https://www.youtube.com/watch?v=6U08V187cpc&t=5191s" />
      </div>
    </Fragment>
  )
}

export default Videos

export async function getServerSideProps({ req }) {
  let origin = req.headers['host']
  return {
    props: {
      origin,
    },
  }
}
