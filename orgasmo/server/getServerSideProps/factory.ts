import type { FactoryParameters } from "../../types";
import type { GetServerSideProps } from "next";

import getPage from "./getPage";
import getUser from "../lib/getUser";
import getCache from "../cache/cacheFactory";

export default function getServerSidePropsFactory({
  driver,
}: FactoryParameters): GetServerSideProps {
  return async function GetServerSideProps(ctx: any) {
    ctx.driver = driver;
    ctx.setCookies = [];
    ctx.rewrites = 0;

    await Promise.all([getUser(ctx), getCache(ctx)]);

    return getPage(ctx);
  };
}
