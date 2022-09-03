import Head from 'next/head'

export default function Layout({
    top, rows, bottom, meta
}) {
    return (
        <div className="container">
          <Head>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <main className="main">
            {top}
            <div className="grid">
              {rows}
            </div>
          </main>
    
          <footer className="footer">
            {bottom}
          </footer>
        </div>
      )
}