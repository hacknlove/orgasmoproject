import type { FactoryParameters } from "../../types";
import type { GetServerSideProps } from "next";

import getPage from "./getPage";
import getUser from "../lib/getUser";
import getCache from "../cache/cacheFactory";
import events from "../events";
import getLabels from "../lib/getLabels";

export default function getServerSidePropsFactory({
  driver,
  noCache,
  Components,
}: FactoryParameters): GetServerSideProps {
  return async function GetServerSideProps(ctx: any) {
    // set the arguments to the context, so they can be used anywhere along the flow
    ctx.noCache = noCache;
    ctx.driver = driver;
    ctx.Components = Components;

    // initialize the cookies object
    ctx.setCookies = [];

    // initialize the rewrites count to avoid loops
    ctx.rewrites = 0;

    // Adds the EventEmitter, so it can be used anywhere
    ctx.events = events;

    await Promise.all([
      // gets the user [driver.user.getUser]
      getUser(ctx),

      // initializes the cache, if noCache is false and needed [driver.cache.factory]
      noCache || getCache(ctx),

      // add the labels that apply to req, (labels are a way to clasiffy request by their headers, in any way that make it possible to render different content for different labels)
      getLabels(ctx),
    ]);

    // if we are in the route /foo/bar/buz and exists a driver method named foo.bar.buz.getServerSideProps that method overrides orgasmo's getServerSideProps
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

    // continue the flow
    return getPage(ctx);
  };
}
