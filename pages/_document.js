import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

const Document = ({ dark }) => {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {dark && <link rel="stylesheet" href="/css/dark.css" />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="google-site-verification" content="hgb7sEPSlo0We6rT4UtpV04_qCFTryuwkcSEdtmAxr8" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3793400768853434" crossorigin="anonymous"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

Document.getInitialProps = async (ctx) => {
  const initialProps = await NextDocument.getInitialProps(ctx)
  let dark = ctx.asPath.includes('/blog/')
  return { ...initialProps, dark }
}

export default Document
