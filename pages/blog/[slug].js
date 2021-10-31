import dynamic from 'next/dynamic'
import Image from '@/components/Image'
import { useTheme } from 'next-themes'
import SEO from '@/components/seo-head'
import Author from '@/components/Author'
import Article from '@/components/Article'
import { useEffect, useState } from 'react'
import markdownToHtml from '@/lib/markdown'
import { deploymentUrl, imageLink } from '@/lib/data'
import { getComments } from '@/components/blog/comments'
import SocialMediaLinks from '@/components/social-media-links'

const LoadComments = dynamic(
  () => import('@/components/blog/comments').then((mod) => mod.LoadComments),
  { ssr: false }
)

const WriteComment = dynamic(() => import('@/components/blog/comments'), { ssr: false })
const MorePosts = dynamic(() => import('@/components/blog/more-posts'))

export default function Post({ content, post, morePosts }) {
  const { theme } = useTheme()
  const [comments, setComments] = useState([])
  const [mounted, setMounted] = useState(false)
  const SEODetails = {
    description: post.content.intro,
    pubDate: post.first_published_at,
    author: post.content.author.name,
    canonical: `${deploymentUrl}/blog/${post.slug}`,
    title: `${post.content.title} - ${post.content.author.name}`,
  }
  if (post.content.image)
    SEODetails['image'] = `${imageLink}/api?title=${post.content.title}&image=${post.content.image}`
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div className="w-full flex flex-col items-center">
      <SEO {...SEODetails} />
      <div className="w-full md:max-w-2xl">
        <h1 className="font-bold text-2xl sm:text-4xl">{post.content.title}</h1>
        <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <Author post={post} {...SEODetails} />
          <SocialMediaLinks altText={post.content.title} url={SEODetails['canonical']} />
        </div>
        <div className="py-3"></div>
        <Image
          alt={post.content.title}
          title={post.content.title}
          src={`${imageLink}/api?title=${post.content.title}&image=${post.content.image}${
            mounted ? (theme == 'light' ? '' : '&mode=o') : ''
          }`}
        />
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

export async function getStaticProps({ params }) {
  const blogFetch = await fetch(`${deploymentUrl}/api/blog/${params.slug}`)
  if (!blogFetch.ok) return { notFound: true }
  const blogData = await blogFetch.json()
  blogData['post']['content']['long_text'] = await markdownToHtml(blogData.post.content.long_text)
  return {
    props: { ...blogData },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
