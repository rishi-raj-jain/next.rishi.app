require('dotenv').config()
const fs = require('fs')
const globby = require('globby')
const fetch = require('node-fetch')
const prettier = require('prettier')

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch('https://gapi.storyblok.com/v1/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Token: process.env.STORYBLOK_API_KEY,
      Version: preview ? 'draft' : 'published',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
      {
        PostItems {
          items {
            slug
          }
        }
      }
    `)
  return data?.PostItems.items
}

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby(['!pages/api', 'pages/*.js', '!pages/_*.js', '!pages/404.js'])
  const allPosts = await getAllPostsWithSlug()

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${
              pages
                .map((page) => {
                  const path = page.replace('.js', '').replace('data', '').replace('pages', '')

                  let route = path
                  if (path === '/index') route = ''
                  return `<url>
                    <loc>${`https://rishi.app${route}`}</loc>
                </url>
                `
                })
                .join('') +
              allPosts
                .map((post) => {
                  return `<url>
                      <loc>${`https://rishi.app/blog/${post.slug}`}</loc>
                  </url>
                  `
                })
                .join('')
            }
        </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  fs.writeFileSync('public/sitemap.xml', formatted)
})()
