import Head from "next/head";
import { useMemo } from "react";

export default function Meta({ meta }) {
  const title = useMemo(
    () => meta && meta.find(([name]) => name === "title")?.[1],
    [meta]
  );

  return (
    meta && (
      <Head>
        {title !== undefined && <title>{title}</title>}
        {meta.map(([key, value]) => (
          <meta key={key} name={key} content={value}></meta>
        ))}
      </Head>
    )
  );
}
