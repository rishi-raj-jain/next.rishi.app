import Link from 'next/link'
import SEO from '@/components/Seo'
import { Prefetch } from '@edgio/react'
import { getOrigin } from '@/lib/operations'
import SearchBar from '@/components/SearchBar'
import DateString from '@/components/DateString'
import { createNextDataURL } from '@edgio/next/client'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'
import { getAllPostsForHome, getRecommendedPosts, getTagline } from '@/lib/api'

export async function getServerSideProps({ req }) {
  let origin = getOrigin(req)
  let props = { origin }
  const allPosts = await getAllPostsForHome()
  if (allPosts && allPosts.length > 0) {
    props['allPosts'] = allPosts
  }
  const recommendedPosts = await getRecommendedPosts()
  if (recommendedPosts && recommendedPosts.length > 0) {
    props['recommendedPosts'] = recommendedPosts
  }
  const data = await getTagline('blogs')
  if (data && data?.type) {
    props['data'] = new RichTextResolver().render(data)
  }
  if (!props.hasOwnProperty('allPosts')) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }
  return { props }
}

const Blogs = ({ allPosts, recommendedPosts, data, origin }) => {
  const SEODetails = {
    title: `Blogs - Rishi Raj Jain`,
    canonical: `${origin}/blogs`,
  }
  return (
    <>
      <SEO {...SEODetails} />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold sm:text-5xl">Blogs</h1>
        <h2
          className="font-regular text-md mt-5 whitespace-pre-line dark:text-gray-400 sm:text-xl"
          dangerouslySetInnerHTML={{
            __html: data,
          }}
        />
        <SearchBar content={allPosts} />
        <div className="flex flex-row flex-wrap">
          <div className="mt-10 flex w-full flex-col lg:mt-20 lg:w-2/3 lg:pr-10">
            {allPosts &&
              allPosts.map((item) => (
                <div key={`/blog/${item.slug}`} className="mb-10 flex flex-col border-b pb-10 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-400">
                    <DateString date={new Date(item.first_published_at)} />
                  </span>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="mt-3 hover:underline"
                    id={createNextDataURL({ href: `/blog/${item.slug}`, routeParams: { slug: item.slug } })}
                  >
                    <Prefetch url={createNextDataURL({ href: `/blog/${item.slug}`, routeParams: { slug: item.slug } })}>
                      <span className="text-lg font-bold sm:text-2xl">{item.content.title}</span>
                    </Prefetch>
                  </Link>
                  <span className="mt-3 text-sm text-gray-700 line-clamp-2 dark:text-gray-400">{item.content.intro}</span>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="mt-5 text-sm uppercase text-blue-500 hover:underline"
                    id={createNextDataURL({ href: `/blog/${item.slug}`, routeParams: { slug: item.slug } })}
                  >
                    Read More &rarr;
                  </Link>
                </div>
              ))}
          </div>
          <div className="mt-0 flex w-full flex-col lg:mt-20 lg:w-1/3">
            <h4 className="text-md font-bold sm:text-lg">Recommended Posts</h4>
            {recommendedPosts &&
              recommendedPosts.map((item) => (
                <a
                  rel="noopener"
                  target="_blank"
                  key={item.content.Title}
                  href={item.content.Url.url}
                  className="mt-5 truncate border-b pb-2 text-sm font-light"
                >
                  {item.content.Title}
                </a>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Blogs
