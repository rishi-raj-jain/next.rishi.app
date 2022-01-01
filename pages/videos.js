import { Fragment } from 'react'
import SEO from '@/components/Seo'
import ReactPlayer from 'react-player'
import { deploymentUrl } from '@/lib/data'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

const Videos = ({ videoTagline = '' }) => {
  const SEODetails = {
    title: `Videos - Rishi Raj Jain`,
    canonical: `${deploymentUrl}/videos`,
  }
  return (
    <Fragment>
      <SEO {...SEODetails} />
      <h1 className="font-bold text-2xl sm:text-5xl">Videos</h1>
      <h2
        dangerouslySetInnerHTML={{
          __html: new RichTextResolver().render(videoTagline),
        }}
        className="mt-5 dark:text-gray-400 font-regular text-md sm:text-xl whitespace-pre-line"
      />
      <div className="flex flex-row flex-wrap gap-10">
        <ReactPlayer
          width={320}
          height={250}
          url="https://www.youtube.com/watch?v=miMm7qGMqLw"
        />
        <ReactPlayer
          width={320}
          height={250}
          url="https://www.youtube.com/watch?v=6U08V187cpc&t=5191s"
        />
      </div>
    </Fragment>
  )
}

export default Videos
