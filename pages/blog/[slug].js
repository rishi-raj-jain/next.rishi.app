import { useState } from 'react'
import dynamic from 'next/dynamic'
import SEO from '@/components/Seo'
import Author from '@/components/Author'
import Article from '@/components/Article'
import markdownToHtml from '@/lib/markdown'
import { getOrigin } from '@/lib/operations'
import DateString from '@/components/DateString'
import { getOtherBlogs, getPost } from '@/lib/api'
import { getComments } from '@/components/blog/comments'

// Lazy Load Comments Components
const LoadComments = dynamic(() => import('@/components/blog/comments').then((mod) => mod.LoadComments), { ssr: false })
const WriteComment = dynamic(() => import('@/components/blog/comments'), { ssr: false })

// Lazy Load More Posts Components
const MorePosts = dynamic(() => import('@/components/blog/more-posts'), { ssr: false })

export async function getServerSideProps({ req, params }) {
  let origin = getOrigin(req)
  let props = { origin }
  const data = await getPost(params.slug)
  if (data && data.post) {
    data['post']['content']['long_text'] = await markdownToHtml(data['post']['content']['long_text'])
    const { first_published_at, full_slug } = data['post']
    const prevBlog = await getOtherBlogs(first_published_at, full_slug, 1, true)
    const nextBlog = await getOtherBlogs(first_published_at, full_slug, 1, false)
    data['morePosts'] = [].concat(prevBlog).concat(nextBlog)
    props['data'] = data
  }
  return { props }
}

const Post = ({ data, origin }) => {
  const { post, morePosts } = data
  const SEODetails = {
    description: post.content.intro,
    pubDate: post.first_published_at,
    author: post.content.author.name,
    canonical: `${origin}/blog/${post.slug}`,
    title: `${post.content.title} - ${post.content.author.name}`,
  }
  if (post.content.image)
    SEODetails['image'] = `https://rishi-raj-jain-html-og-image-default.layer0-limelight.link/api?title=${encodeURIComponent(
      post.content.title
    )}&image=${encodeURIComponent(post.content.image)}&mode=${encodeURIComponent('true')}`

  const [comments, setComments] = useState([])

  return (
    <div className="flex w-full flex-col items-center">
      <SEO {...SEODetails} />
      <div className="w-full md:max-w-2xl">
        <div className="flex w-full flex-col items-center">
          <DateString date={new Date(SEODetails.pubDate)} />
          <h1 className="mt-3 mb-7 text-center text-2xl font-bold sm:text-4xl">{post.content.title}</h1>
          <Author post={post} {...SEODetails} />
        </div>
        <div className="mt-7 h-[1px] w-full bg-gray-200"></div>
        <Article post={post} />
        <WriteComment setComments={setComments} slug={post.slug} />
        <div className="mt-10 w-full border-t pt-10 dark:border-gray-500">
          <button
            onClick={() => getComments(post.slug, setComments)}
            className="w-[200px] appearance-none rounded border py-2 px-5 text-center hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-[#28282B]"
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

export default Post
