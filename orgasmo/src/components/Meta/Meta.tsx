import Head from "next/head";

export default function Meta({ meta }: { meta: Record<string, string> }) {
  return (
    <Head>
      <title>{meta.title}</title>
      {Object.entries(meta).map(([key, value]) => (
        <meta key={key} name={key} content={value}></meta>
      ))}
    </Head>
  );
}
