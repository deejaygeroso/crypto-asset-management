import React from 'react'
// import Head from 'next/head'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <meta name="google-site-verification" content="sD788K7JdAM4mbbGI5YZDyOgnnxE-MxkvvkBBq3hzTk" />
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}