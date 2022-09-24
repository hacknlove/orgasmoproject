import Head from "next/head";

export default function Layout({ areas }) {
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        {areas.header}
        <div className="grid">{areas.main}</div>
      </main>

      <footer className="footer">{areas.footer}</footer>
    </div>
  );
}
