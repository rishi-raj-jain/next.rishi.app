import SEO from '@/components/Seo'
import { getTagline } from '@/lib/api'
import { storyblok } from '@/lib/storyblok'
import { getOrigin } from '@/lib/operations'
import Description from '@/components/Description'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

export async function getServerSideProps({ req }) {
  let origin = getOrigin(req)
  let props = { origin, storyblok }
  const data = await getTagline('storyblok')
  if (data && data?.type) {
    props['data'] = new RichTextResolver().render(data)
  }
  if (!props.hasOwnProperty('storyblok')) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }
  return { props }
}

const Storyblok = ({ data, storyblok, origin }) => {
  const SEODetails = {
    title: `Storyblok - Rishi Raj Jain`,
    canonical: `${origin}/storyblok`,
  }
  return (
    <>
      <SEO {...SEODetails} />
      <Description heading={'Storyblok x Rishi Raj Jain'} subHead={'About'} description={data} data={storyblok} />
    </>
  )
}

export default Storyblok
