import Link from 'next/link'
import { useEffect, useState } from 'react'
import { prefetch } from '@edgio/prefetch/window'
import { createNextDataURL } from '@/lib/operations'

const MorePosts = ({ morePosts }) => {
  const [filteredPosts, setFilteredPosts] = useState(morePosts ? morePosts.filter((item) => item.hasOwnProperty('name')) : [])

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
          <Link href={`/blog/${item.slug}`} key={item.slug} className="mb-5 block w-full text-lg font-bold hover:underline">
            {item.name}
          </Link>
        ))}
      </div>
    )
  )
}

export default MorePosts
