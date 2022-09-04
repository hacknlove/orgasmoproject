import Head from 'next/head'

export default function Layout({
    header, main, footer, meta
}) {
    return (
        <div className="container">
          <Head>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <main className="main">
            {header}
            <div className="grid">
              {main}
            </div>
          </main>
    
          <footer className="footer">
            {footer}
          </footer>
        </div>
      )
}