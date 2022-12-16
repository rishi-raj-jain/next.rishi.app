import { Html, Head, Main, NextScript } from 'next/document'

const Document = ({}) => {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="google-site-verification" content="hgb7sEPSlo0We6rT4UtpV04_qCFTryuwkcSEdtmAxr8" />
        <script
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3793400768853434"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <link rel="stylesheet" href="/css/dark.css" />
      </body>
    </Html>
  )
}

export default Document
