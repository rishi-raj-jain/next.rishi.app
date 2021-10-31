import Link from 'next/link'
import Image from '@/components/Image'
import { useTheme } from 'next-themes'
import { imageLink } from '@/lib/data'
import { useEffect, useState } from 'react'
import Prefetch from '@layer0/react/Prefetch'

const MorePosts = ({ morePosts }) => {
  const { theme } = useTheme()
  const [mounted, setMounted]= useState(true)
  const filteredPosts= morePosts.filter((item) => item.hasOwnProperty('name'))
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    filteredPosts.length > 0 && (
      <div className="flex flex-col">
        {filteredPosts.map((item) => (
          <Link href={`/blog/${item.slug}`} key={item.slug} passHref>
            <Prefetch>
              <a className="mt-10 block w-full">
                <Image
                  alt={item.name}
                  title={item.name}
                  src={`${imageLink}/api?title=${item.name}&image=${item.content.image}${mounted ? (theme == 'light' ? '' : '&mode=o') : ''}`}
                />
              </a>
            </Prefetch>
          </Link>
        ))}
      </div>
    )
  )
}

export default MorePosts
