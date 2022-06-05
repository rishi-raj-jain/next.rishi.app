import Head from 'next/head'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const Article = ({ post }) => {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <>
      <article className="prose mt-10 max-w-none text-sm dark:prose-light" dangerouslySetInnerHTML={{ __html: post.content.long_text }} />
      <link rel="stylesheet" href={`/css/${mounted ? (theme === 'system' ? systemTheme : theme) : 'light'}.css`} />
    </>
  )
}

export default Article
