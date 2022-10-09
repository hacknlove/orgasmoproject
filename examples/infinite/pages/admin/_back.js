import { useEffect } from "react";
import Router from "next/router";
export default function BackTo({ to }) {
  useEffect(() => {
    Router.replace(to);
  }, []);

  return null;
}

export function getServerSideProps(ctx) {
  return {
    props: {
      to: ctx.query.to,
    },
  };
}
