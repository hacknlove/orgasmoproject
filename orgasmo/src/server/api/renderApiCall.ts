import expandPageConfig from "../getServerSideProps/expand/pageConfig";
import events from "../events";

type pageParams = Record<string, any>;

export default async function renderApiCall(ctx) {
  if (ctx.req.method !== "POST") {
    return ctx.res.json(null);
  }

  ctx.req.user = { roles: [] };

  const { pageConfig, resolvedUrl } = ctx.req.body;

  let params: pageParams = {
    params: ctx.params,
    parsedPath: ctx.parsedPath,
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
