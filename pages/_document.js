import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="manifest.json" />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Blue Crystal" />
          <meta name="apple-mobile-web-app-title" content="Blue Crystal" />
          <meta name="theme-color" content="#0088FF" />
          <meta name="msapplication-navbutton-color" content="#0088FF" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="msapplication-starturl" content="/" />

          <link rel="icon" href="/assets/icons/icon-192x192.png" />
          <link rel="apple-touch-icon" href="/assets/icons/icon-192x192.png" />
          <link rel="icon" sizes="256x256" href="/assets/icons/icon-256x256.png" />
          <link rel="apple-touch-icon" sizes="256x256" href="/assets/icons/icon-256x256.png" />
          <link rel="icon" sizes="384x384" href="/assets/icons/icon-384x384.png" />
          <link rel="apple-touch-icon" sizes="384x384" href="/assets/icons/icon-384x384.png" />
          <link rel="icon" sizes="512x512" href="/assets/icons/icon-512x512.png" />
          <link rel="apple-touch-icon" sizes="512x512" href="/assets/icons/icon-512x512.png" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument