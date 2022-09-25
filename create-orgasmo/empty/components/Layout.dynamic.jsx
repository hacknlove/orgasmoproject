import Head from "next/head";
import Area from "@orgasmo/orgasmo/Area";

export default function Layout() {
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Area name="header" />
        <div className="grid">
          <Area name="main" />
        </div>
      </main>

      <footer className="footer">
        <Area name="footer" />
      </footer>
    </div>
  );
}
