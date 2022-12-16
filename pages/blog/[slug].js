import SEO from '@/components/Seo'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import Author from '@/components/Author'
import markdownToHtml from '@/lib/markdown'
import { useEffect, useState } from 'react'
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
  if (!props.hasOwnProperty('data')) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }
  return { props }
}

const Post = ({ data, origin }) => {
  const encode = (content) => encodeURIComponent(content)
  const ogImageOrigin = 'https://rishi-raj-jain-html-og-image-default.layer0-limelight.link/api'

  const [comments, setComments] = useState()
  const [post, setPost] = useState(data?.post ?? false)
  const [morePosts, setMorePosts] = useState(data?.morePosts ?? false)

  const ogImageQuery = (post) => ({
    title: encode(post?.content?.title),
    image: encode(post?.content?.image),
    mode: encode('true'),
  })

  const [SEODetails, setSEODetails] = useState({
    description: post?.content?.intro,
    pubDate: post?.first_published_at,
    author: post?.content?.author?.name,
    canonical: `${origin}/blog/${post?.slug}`,
    title: `${post?.content?.title} - ${post?.content?.author?.name}`,
    [post?.content?.image ? 'image' : 'some-random-key']: `${ogImageOrigin}?${Object.keys(ogImageQuery(post))
      .map((i) => `${i}=${ogImageQuery(post)[i]}`)
      .join('&')}`,
  })

  useEffect(() => {
    setTimeout(() => {
      var sc = document.createElement('script')
      sc.src = `https://servedby.studads.com/ads/ads.php?t=MTcxMTg7MTA5OTg7aG9yaXpvbnRhbC5sZWFkZXJib2FyZA==&index=${
        Math.floor(Math.random() * 10) + 1
      }`
      document.querySelector('.before-article').appendChild(sc)
    }, 1000)
  }, [])

  useEffect(() => {
    let post,
      morePosts = null
    if (data) {
      if (data.hasOwnProperty('post')) {
        post = data.post
      }
      if (data.hasOwnProperty('morePosts')) {
        morePosts = data.morePosts
      }
    }
    if (morePosts) {
      setMorePosts(morePosts)
    }
    if (post) {
      setPost(post)
      setSEODetails({
        description: post?.content?.intro,
        pubDate: post?.first_published_at,
        author: post?.content?.author?.name,
        canonical: `${origin}/blog/${post?.slug}`,
        title: `${post?.content?.title} - ${post?.content?.author?.name}`,
        [post?.content?.image ? 'image' : 'some-random-key']: `${ogImageOrigin}?${Object.keys(ogImageQuery(post))
          .map((i) => `${i}=${ogImageQuery(post)[i]}`)
          .join('&')}`,
      })
    }
  }, [data])

  return (
    <div className="flex w-full flex-col items-center">
      <SEO {...SEODetails} />
      <div className="w-full md:max-w-2xl">
        <div className="flex w-full flex-col items-center">
          <DateString date={new Date(SEODetails?.pubDate)} />
          <h1
            className={classNames('mt-3 mb-7 text-center text-2xl font-bold sm:text-4xl', {
              'w-full animate-pulse bg-black/50 py-4 dark:bg-white/50': !post?.content?.title?.length,
            })}
          >
            {post?.content?.title}
          </h1>
          <Author post={post} {...SEODetails} />
        </div>
        <div className="mt-7 h-[1px] w-full bg-gray-200"></div>
        <div className="before-article mt-2 h-[90px] w-full max-w-full overflow-y-scroll py-2"></div>
        <article
          className="prose mt-10 flex max-w-none flex-col items-center text-sm dark:prose-light"
          dangerouslySetInnerHTML={{
            __html:
              post?.content?.long_text ??
              '<h3 class="w-full animate-pulse bg-black/50 py-2 dark:bg-white/50"></h3><h3 class="w-full animate-pulse bg-black/50 py-2 dark:bg-white/50"></h3><h3 class="w-full animate-pulse bg-black/50 py-2 dark:bg-white/50"></h3><h3 class="w-full animate-pulse bg-black/50 py-2 dark:bg-white/50"></h3>',
          }}
        />
        <WriteComment setComments={setComments} slug={post?.slug} />
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
