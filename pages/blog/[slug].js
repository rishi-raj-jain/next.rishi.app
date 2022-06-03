import dynamic from 'next/dynamic'
import SEO from '@/components/Seo'
import { useTheme } from 'next-themes'
import { imageLink } from '@/lib/data'
import Author from '@/components/Author'
import Article from '@/components/Article'
import { useEffect, useState } from 'react'
import markdownToHtml from '@/lib/markdown'
import DateString from '@/components/DateString'
import { getComments } from '@/components/blog/comments'

const LoadComments = dynamic(
  () => import('@/components/blog/comments').then((mod) => mod.LoadComments),
  { ssr: false }
)

const WriteComment = dynamic(() => import('@/components/blog/comments'), { ssr: false })
const MorePosts = dynamic(() => import('@/components/blog/more-posts'))

export default function Post({ post, morePosts, origin }) {
  const { theme } = useTheme()
  const [comments, setComments] = useState([])
  const [mounted, setMounted] = useState(false)
  const SEODetails = {
    description: post.content.intro,
    pubDate: post.first_published_at,
    author: post.content.author.name,
    canonical: `https://${origin}/blog/${post.slug}`,
    title: `${post.content.title} - ${post.content.author.name}`,
  }
  if (post.content.image)
    SEODetails['image'] = `${imageLink}/api?title=${post.content.title}&image=${post.content.image}`
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div className="w-full flex flex-col items-center">
      <SEO {...SEODetails}>
        <link as="script" rel="preload" href="/css/light.css" />
        <link as="script" rel="preload" href="/css/dark.css" />
      </SEO>
      <div className="w-full md:max-w-2xl">
        <div className="w-full flex flex-col items-center">
          <DateString date={new Date(SEODetails.pubDate)} />
          <h1 className="mt-3 mb-7 text-center font-bold text-2xl sm:text-4xl">
            {post.content.title}
          </h1>
          <Author post={post} {...SEODetails} />
        </div>
        <div className="mt-7 w-full h-[1px] bg-gray-200"></div>
        <Article post={post} />
        <WriteComment setComments={setComments} slug={post.slug} />
        <div className="mt-10 pt-10 w-full border-t dark:border-gray-500">
          <button
            onClick={() => getComments(post.slug, setComments)}
            className="w-[200px] appearance-none py-2 px-5 text-center rounded border hover:bg-gray-100 dark:hover:bg-[#28282B] dark:border-gray-500"
          >
            Load Comments
          </button>
        </div>
        <LoadComments comments={comments} />
        <MorePosts morePosts={morePosts} />
      </div>
    </div>
  )
}

export async function getServerSideProps({ req, params }) {
  let origin = req.headers['host']
  const resp = await fetch(`https://${origin}/api/blog/${params.slug}`)
  if (!resp.ok) return { notFound: true }
  const data = await resp.json()
  data['post']['content']['long_text'] = await markdownToHtml(data.post.content.long_text)
  return {
    props: { ...data, origin },
  }
}
