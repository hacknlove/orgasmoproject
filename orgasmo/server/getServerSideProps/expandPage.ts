import { decencode } from "cencode";
import { cleanAwaitJson } from "../lib/cleanJson";
import { currentTimeChunk } from "../lib/timechunks";
import { serialize } from "../lib/serialization";
import getRows from "./getRows";
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
      top: getRows({
        ctx,
        params,
        rows: pageConfig.top,
        timeChunk,
      }),
      rows: getRows({
        ctx,
        params,
        rows: pageConfig.rows,
        limit: pageConfig.rowsLimit,
        timeChunk,
      }),
      bottom: getRows({
        ctx,
        params,
        rows: pageConfig.bottom,
        timeChunk,
      }),
      src:
        pageConfig.rowsLimit &&
        `/api/_ogr?c=${serialize({
          pageId: pageConfig.id,
          params,
          roles: ctx.req.user.roles,
          expire: timeChunk.expire,
        })}`,
    },
  });
}
