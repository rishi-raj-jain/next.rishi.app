import SEO from '@/components/Seo'
import { getOrigin } from '@/lib/operations'
import AboutWithFallback from '@/components/About'
import { getTagline, getTimelineItems } from '@/lib/api'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

export async function getServerSideProps({ req }) {
  let origin = getOrigin(req)
  let props = { origin }
  // Start creating timeline object(s)
  let arePosts = true,
    page = 1,
    Timeline = {}
  while (arePosts) {
    let tempTimeline = (await getTimelineItems(5, page)) || []
    if (tempTimeline.length > 0) {
      tempTimeline.forEach((a) => {
        if (Timeline.hasOwnProperty(a.content.Year)) {
          Timeline[a.content.Year].push(a)
        } else {
          Timeline[a.content.Year] = [a]
        }
      })
      page += 1
    } else {
      arePosts = false
    }
  }
  props['Timeline'] = Timeline
  // Render and serve the value for about page
  const aboutTagline = await getTagline('about')
  if (aboutTagline && aboutTagline?.type) {
    props['aboutTagline'] = new RichTextResolver().render(aboutTagline)
  }
  if (!props.hasOwnProperty('Timeline')) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }
  return { props }
}

const About = ({ Timeline, aboutTagline, origin }) => {
  const SEODetails = {
    title: `About Me - Rishi Raj Jain`,
    canonical: `${origin}/about`,
  }
  return (
    <>
      <SEO {...SEODetails} />
      <AboutWithFallback heading="About Me" tagline={aboutTagline} description="My Timeline" data={Timeline} />
    </>
  )
}

export default About
