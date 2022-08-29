import { MAX_REWRITES } from "../lib/config";
import events from "../events";
import getPage from "./getPage";

export default function rewrite({ ctx, rewrite, key }) {
  if (!ctx.original) {
    ctx.original = {
      roles: ctx.req.user.roles,
      params: ctx.params,
      query: ctx.query,
      key,
    };
  }

  ctx.rewrites = (ctx.rewrites ?? 0) + 1;

  if (ctx.rewrites > MAX_REWRITES) {
    events.emit("MAX_REWRITES", {
      original: ctx.original,
      ctx,
      rewrite: rewrite,
    });
    return {
      notFound: true,
    };
  }

  return getPage(ctx);
}
