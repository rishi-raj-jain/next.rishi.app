import Link from 'next/link'
import Image from '@/components/Image'
import { useTheme } from 'next-themes'
import SEO from '@/components/seo-head'
import { Prefetch } from '@layer0/react'
import DateString from '@/components/DateString'
import { Fragment, useEffect, useState } from 'react'
import { deploymentUrl, imageLink } from '@/lib/data'
import RichTextResolver from 'storyblok-js-client/dist/richTextResolver'

const Blogs = ({ allPosts, recommendedPosts, blogsTagline }) => {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const SEODetails = {
    title: `Blogs - Rishi Raj Jain`,
    canonical: `${deploymentUrl}/blogs`,
  }
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <Fragment>
      <SEO {...SEODetails} />
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl sm:text-5xl">Blogs</h1>
        <h2
          className="mt-5 dark:text-gray-400 font-regular text-md sm:text-xl whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: new RichTextResolver().render(blogsTagline),
          }}
        />
        <div className="flex flex-row flex-wrap">
          <div className="mt-10 lg:mt-20 w-full lg:w-2/3 lg:pr-10 flex flex-col">
            {allPosts.map((item) => (
              <div
                className="border-b dark:border-gray-700 pb-10 mb-10 flex flex-col"
                key={`/blog/${item.slug}`}
              >
                <span className="dark:text-gray-400 text-gray-700">
                  <DateString date={new Date(item.first_published_at)} />
                </span>
                <Link href={`/blog/${item.slug}`} passHref>
                  <Prefetch>
                    <a className="hidden mt-3 hover:underline">
                      <span className="font-bold text-lg sm:text-2xl">{item.content.title}</span>
                    </a>
                  </Prefetch>
                </Link>
                {item?.content?.image && (
                  <Link href={`/blog/${item.slug}`} passHref>
                    <Prefetch>
                      <a className="mt-3 mb-3 block hover:underline w-full rounded bg-gray-50">
                        <Image
                          alt={item.content.image}
                          title={item.content.image}
                          src={`${imageLink}/api?title=${item.content.title}&image=${
                            item.content.image
                          }${mounted ? (theme == 'light' ? '' : '&mode=o') : ''}`}
                        />
                      </a>
                    </Prefetch>
                  </Link>
                )}
                <span className="mt-3 dark:text-gray-400 text-gray-700 line-clamp-2 text-md sm:text-lg">
                  {item.content.intro}
                </span>
                <Link href={`/blog/${item.slug}`} passHref>
                  <Prefetch>
                    <a className="hover:underline text-blue-500 mt-5 uppercase text-sm">
                      Read More &rarr;
                    </a>
                  </Prefetch>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-0 lg:mt-20 w-full lg:w-1/3 flex flex-col">
            <h4 className="font-bold text-md sm:text-lg">Recommended Posts</h4>
            {recommendedPosts.map((item) => (
              <a
                key={item.content.Title}
                className="mt-5 pb-2 border-b dark:border-gray-700 hover:underline truncate dark:text-gray-400 text-gray-500 text-sm"
                target="_blank"
                rel="noopener"
                href={item.content.Url.url}
              >
                {item.content.Title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Blogs

export async function getStaticProps() {
  const blogsFetch = await fetch(`${deploymentUrl}/api/blogs`)
  if (!blogsFetch.ok) return { notFound: true }
  const blogsData = await blogsFetch.json()
  return {
    props: { ...blogsData },
    revalidate: 60,
  }
}
