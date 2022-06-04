import Link from 'next/link'
import Prefetch from '@layer0/react/Prefetch'
import { createNextDataURL } from '@layer0/next/client'

const MorePosts = ({ morePosts }) => {
  const filteredPosts = morePosts.filter((item) => item.hasOwnProperty('name'))

  return (
    filteredPosts.length > 0 && (
      <div className="flex flex-col">
        <div className="mt-10 mb-5 text-sm">
          <span> More Posts &rarr; </span>
        </div>
        {filteredPosts.map((item) => (
          <Link href={`/blog/${item.slug}`} key={item.slug}>
            <Prefetch url={createNextDataURL({ href: `/blog/${item.slug}`, routeParams: { slug: item.slug } })}>
              <a href={`/blog/${item.slug}`} className="mb-5 block w-full text-lg font-bold hover:underline">
                {item.name}
              </a>
            </Prefetch>
          </Link>
        ))}
      </div>
    )
  )
}

export default MorePosts
