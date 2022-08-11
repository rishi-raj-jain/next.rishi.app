import Link from 'next/link'
import { useEffect } from 'react'
import { prefetch } from '@layer0/prefetch/window'
import { createNextDataURL } from '@layer0/next/client'

const MorePosts = ({ morePosts }) => {
  const filteredPosts = morePosts.filter((item) => item.hasOwnProperty('name'))

  useEffect(() => {
    filteredPosts.forEach((item) => {
      prefetch(createNextDataURL({ href: `/blog/${item.slug}`, routeParams: { slug: item.slug } }))
    })
  }, [])

  return (
    filteredPosts.length > 0 && (
      <div className="flex flex-col">
        <div className="mt-10 mb-5 text-sm">
          <span> More Posts &rarr; </span>
        </div>
        {filteredPosts.map((item) => (
          <Link href={`/blog/${item.slug}`} key={item.slug}>
            <a href={`/blog/${item.slug}`} className="mb-5 block w-full text-lg font-bold hover:underline">
              {item.name}
            </a>
          </Link>
        ))}
      </div>
    )
  )
}

export default MorePosts
