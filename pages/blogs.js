import Link from 'next/link'
import { useEffect } from 'react'
import SEO from '@/components/Seo'
import { getOrigin } from '@/lib/operations'
import SearchBar from '@/components/SearchBar'
import DateString from '@/components/DateString'
import { prefetch } from '@layer0/prefetch/window'
import { createNextDataURL } from '@layer0/next/client'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const Blogs = ({ allPosts, recommendedPosts, blogsTagline, origin }) => {
  const SEODetails = {
    title: `Blogs - Rishi Raj Jain`,
    canonical: `${origin}/blogs`,
    deploymentUrl: origin,
  }

  useEffect(() => {
    const onScroll = () => {
      allPosts.forEach((item) => {
        let selector = `[href*="/blog/${item.slug}"]`
        if (!document.querySelector(selector)) return
        if (isElementInViewport(document.querySelector(selector))) {
          prefetch(createNextDataURL({ href: `/blog/${item.slug}`, routeParams: { slug: item.slug } }))
        }
      })
    }
    onScroll()
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
                  <a
                    href={`/blog/${item.slug}`}
                    className="mt-3 hover:underline"
                    id={createNextDataURL({ href: `/blog/${item.slug}`, routeParams: { slug: item.slug } })}
                  >
                    <span className="text-lg font-bold sm:text-2xl">{item.content.title}</span>
                  </a>
                </Link>
                <span className="mt-3 text-sm text-gray-700 line-clamp-2 dark:text-gray-400">{item.content.intro}</span>
                <Link href={`/blog/${item.slug}`}>
                  <a
                    href={`/blog/${item.slug}`}
                    className="mt-5 text-sm uppercase text-blue-500 hover:underline"
                    id={createNextDataURL({ href: `/blog/${item.slug}`, routeParams: { slug: item.slug } })}
                  >
                    Read More &rarr;
                  </a>
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
  let origin = getOrigin(req)
  const resp = await fetch(`${origin}/api/blogs`)
  if (!resp.ok) return { notFound: true }
  const data = await resp.json()
  return {
    props: { ...data, origin },
  }
}
