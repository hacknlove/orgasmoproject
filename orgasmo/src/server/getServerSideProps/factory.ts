import type { FactoryParameters } from "../../types";
import type { GetServerSideProps } from "next";

import getPage from "./getPage";
import getUser from "../lib/getUser";
import getCache from "../cache/cacheFactory";
import events from "../events";

export default function getServerSidePropsFactory({
  driver,
  noCache,
  Components,
}: FactoryParameters): GetServerSideProps {
  return async function GetServerSideProps(ctx: any) {
    ctx.noCache = noCache;
    ctx.driver = driver;
    ctx.Components = Components;
    ctx.setCookies = [];
    ctx.rewrites = 0;
    ctx.events = events;

    await Promise.all([getUser(ctx), noCache || getCache(ctx)]);

    const methodPath =
      ctx.resolvedUrl
        .substring(1)
        .replace(/\?.*$/, "")
        .split("/")
        .map((fragment) => fragment.replace(/[^a-z0-9_]/g, "ー"))
        .join(".") + `.getServerSideProps`;

    if (driver[methodPath]) {
      return driver[methodPath](ctx);
    }

    return getPage(ctx);
  };
}
