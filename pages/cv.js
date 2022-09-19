import { cv } from '@/lib/cv'
import SEO from '@/components/Seo'
import { getTagline } from '@/lib/api'
import { getOrigin } from '@/lib/operations'
import Description from '@/components/Description'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

export async function getServerSideProps({ req }) {
  let origin = getOrigin(req)
  let props = { origin, cv }
  const data = await getTagline('cv')
  if (data && data?.type) {
    props['data'] = new RichTextResolver().render(data)
  }
  return { props }
}

const CV = ({ data, cv, origin }) => {
  const SEODetails = {
    title: `CV - Rishi Raj Jain`,
    canonical: `${origin}/cv`,
  }
  return (
    <>
      <SEO {...SEODetails} />
      <Description heading="Rishi Raj Jain" subHead="About" description={data} data={cv} />
    </>
  )
}

export default CV
