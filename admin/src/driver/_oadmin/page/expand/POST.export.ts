import expandPageConfig from "@orgasmo/orgasmo/expandPageConfig";
import events from "@orgasmo/orgasmo/events";

type pageParams = Record<string, any>;

export default async function expandPageConfigApi(ctx) {
  ctx.req.user = { roles: [] };

  const { pageConfig, resolvedUrl, parsedPath } = ctx.req.body;

  let params: pageParams = {
    params: ctx.params,
    parsedPath: parsedPath ?? {},
    path: resolvedUrl.replace(/\?.*$/, ""),
  };

  if (pageConfig.getParams) {
    try {
      params = (await ctx.driver[pageConfig.getParams](ctx)) || params;
    } catch (error) {
      events.emit("error", {
        type: "driver",
        method: "page.getParams",
        params: [ctx],
        error,
      });
      return {
        notFound: true,
      };
    }
  }

  return ctx.res.json(
    await expandPageConfig({
      ctx,
      pageConfig,
      params,
      key: "",
    })
  );
}
