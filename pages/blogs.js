import Link from 'next/link'
import { useEffect } from 'react'
import SEO from '@/components/Seo'
import { Prefetch } from '@layer0/react'
import SearchBar from '@/components/SearchBar'
import DateString from '@/components/DateString'
import { prefetch } from '@layer0/prefetch/window'
import { createNextDataURL } from '@layer0/next/client'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

const Blogs = ({ allPosts, recommendedPosts, blogsTagline, origin }) => {
  const SEODetails = {
    title: `Blogs - Rishi Raj Jain`,
    canonical: `https://${origin}/blogs`,
  }

  useEffect(() => {
    allPosts.forEach((i) => {
      if (i.slug && i.slug.length > 0)
        fetch(createNextDataURL({ href: `/blog/${i.slug}`, routeParams: { slug: i.slug } }))
          .then(() => {
            prefetch(createNextDataURL({ href: `/blog/${i.slug}`, routeParams: { slug: i.slug } }))
          })
          .catch((err) => {
            console.log(err)
          })
    })
  }, [])

  return (
    <>
      <SEO {...SEODetails} />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold sm:text-5xl">Blogs</h1>
        <h2
          className="font-regular text-md mt-5 whitespace-pre-line dark:text-gray-400 sm:text-xl"
          dangerouslySetInnerHTML={{
            __html: new RichTextResolver().render(blogsTagline),
          }}
        />
        <SearchBar content={allPosts} />
        <div className="flex flex-row flex-wrap">
          <div className="mt-10 flex w-full flex-col lg:mt-20 lg:w-2/3 lg:pr-10">
            {allPosts.map((item) => (
              <div key={`/blog/${item.slug}`} className="mb-10 flex flex-col border-b pb-10 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-400">
                  <DateString date={new Date(item.first_published_at)} />
                </span>
                <Link href={`/blog/${item.slug}`}>
                  <Prefetch url={createNextDataURL({ href: `/blog/${item.slug}`, routeParams: { slug: item.slug } })}>
                    <a className="mt-3 hover:underline" href={`/blog/${item.slug}`}>
                      <span className="text-lg font-bold sm:text-2xl">{item.content.title}</span>
                    </a>
                  </Prefetch>
                </Link>
                <span className="mt-3 text-sm text-gray-700 line-clamp-2 dark:text-gray-400">{item.content.intro}</span>
                <Link href={`/blog/${item.slug}`}>
                  <Prefetch url={createNextDataURL({ href: `/blog/${item.slug}`, routeParams: { slug: item.slug } })}>
                    <a href={`/blog/${item.slug}`} className="mt-5 text-sm uppercase text-blue-500 hover:underline">
                      Read More &rarr;
                    </a>
                  </Prefetch>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-0 flex w-full flex-col lg:mt-20 lg:w-1/3">
            <h4 className="text-md font-bold sm:text-lg">Recommended Posts</h4>
            {recommendedPosts.map((item) => (
              <a
                rel="noopener"
                target="_blank"
                key={item.content.Title}
                href={item.content.Url.url}
                className="mt-5 truncate border-b pb-2 text-sm text-gray-500 hover:underline dark:border-gray-700 dark:text-gray-400"
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

export async function getServerSideProps({ req }) {
  let origin = req.headers['host']
  const resp = await fetch(`https://${origin}/api/blogs`)
  if (!resp.ok) return { notFound: true }
  const data = await resp.json()
  return {
    props: { ...data, origin },
  }
}
