import { decencode } from "cencode";
import chooseOne from "../lib/chooseOne";
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
  const page = pageConfig.page ?? chooseOne({ array: pageConfig.pages, ctx });

  if (page.redirect) {
    return {
      redirect: page.redirect,
    };
  }

  if (page.rewrite) {
    return rewrite({ ctx, rewrite: page.rewrite, key });
  }

  params = params || decencode(key);

  const timeChunk = currentTimeChunk(page.timeChunk);

  return cleanAwaitJson({
    props: {
      top: getRows({
        ctx,
        params,
        rows: page.top,
        timeChunk,
      }),
      rows: getRows({
        ctx,
        params,
        rows: page.rows,
        limit: page.rowsLimit,
        timeChunk,
      }),
      bottom: getRows({
        ctx,
        params,
        rows: page.bottom,
        timeChunk,
      }),
      src:
        page.rowsLimit &&
        `/api/_ogr?c=${serialize({
          pageId: page.id,
          params,
          roles: ctx.req.user.roles,
          expire: timeChunk.expire,
        })}`,
    },
  });
}
