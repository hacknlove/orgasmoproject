import { decencode } from "cencode";
import { cleanAwaitJson } from "../lib/cleanJson";
import { currentTimeChunk } from "../lib/timechunks";
import { serialize } from "../lib/serialization";
import getItems from "./getItems";
import rewrite from "./rewrite";

interface expandPageParameters {
  ctx: any;
  pageConfig: any;
  key: string;
  params?: any;
}

export default async function expandPage({
  ctx,
  pageConfig,
  key,
  params,
}: expandPageParameters): Promise<any>;
export default async function expandPage({
  ctx,
  pageConfig,
  key,
  params = undefined,
}) {
  if (pageConfig.redirect) {
    return {
      redirect: pageConfig.redirect,
    };
  }

  if (pageConfig.rewrite) {
    return rewrite({ ctx, rewrite: pageConfig.rewrite, key });
  }

  params = params || decencode(key);

  const timeChunk = currentTimeChunk(pageConfig.timeChunk);

  return cleanAwaitJson({
    props: {
      layout: pageConfig.layout,
      meta: pageConfig.meta,
      header: getItems({
        ctx,
        params,
        items: pageConfig.header,
        timeChunk,
      }),
      main: getItems({
        ctx,
        params,
        items: pageConfig.main,
        limit: pageConfig.mainSsrSize,
        timeChunk,
        getItemConfig: ctx.driver[pageConfig.getItemConfig],
      }),
      mainMode: pageConfig.mainMode,
      mainThreshold: pageConfig.mainMode,
      footer: getItems({
        ctx,
        params,
        items: pageConfig.footer,
        timeChunk,
      }),
      cssVars:
        pageConfig.cssVars &&
        Object.fromEntries(
          Object.entries(pageConfig.cssVars).map(([key, value]) => [
            `--${key}`,
            value,
          ])
        ),
      src:
        pageConfig.mainSsrSize &&
        `/api/_ogr?c=${serialize({
          pageId: pageConfig.pageId,
          params,
          roles: ctx.req.user.roles,
          expire: timeChunk.expire,
        })}`,
    },
  });
}
