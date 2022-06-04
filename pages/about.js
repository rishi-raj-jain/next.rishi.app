import { Fragment } from 'react'
import SEO from '@/components/Seo'
import TimelineItem from '@/components/TimelineItem'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

const About = ({ Timeline, aboutTagline, origin }) => {
  const SEODetails = {
    title: `About Me - Rishi Raj Jain`,
    canonical: `http://${origin}/about`,
  }
  return (
    <Fragment>
      <SEO {...SEODetails} />
      <h1 className="text-2xl font-bold sm:text-5xl">About Me</h1>
      <h2
        dangerouslySetInnerHTML={{
          __html: new RichTextResolver().render(aboutTagline),
        }}
        className="font-regular text-md mt-5 whitespace-pre-line dark:text-gray-400 sm:text-xl"
      />
      <h1 className="mt-16 text-2xl font-bold sm:text-5xl">My Timeline</h1>
      {Object.keys(Timeline)
        .sort((a, b) => (a > b ? -1 : 1))
        .map((item) => (
          <Fragment key={item}>
            <span className="mt-8 text-lg font-bold">{item}</span>
            {Timeline[item].map((exp) => (
              <TimelineItem key={exp.content.Title} {...exp['content']} />
            ))}
          </Fragment>
        ))}
    </Fragment>
  )
}

export default About

export async function getServerSideProps({ req }) {
  let origin = req.headers['host']
  const resp = await fetch(`http://${origin}/api/about`)
  if (!resp.ok) return { notFound: true }
  const data = await resp.json()
  return {
    props: { ...data, origin },
  }
}
