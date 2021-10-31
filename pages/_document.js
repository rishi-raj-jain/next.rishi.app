import { structuredData } from '@/lib/data'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            as="script"
            rel="preload"
            href="https://unpkg.com/prism-themes@1.9.0/themes/prism-material-light.css"
          />
          <link
            as="script"
            rel="preload"
            href="https://unpkg.com/prism-themes@1.9.0/themes/prism-material-dark.css"
          />
          <link
            as="style"
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
            />
          </noscript>
          <meta charSet="utf-8" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="google-site-verification"
            content="hgb7sEPSlo0We6rT4UtpV04_qCFTryuwkcSEdtmAxr8"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
