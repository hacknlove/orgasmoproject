import expandPageConfig from "@orgasmo/orgasmo/expandPageConfig";
import events from "@orgasmo/orgasmo/events";

type pageParams = Record<string, any>;

export default async function expandPageConfigApi(ctx) {
  ctx.req.user = { roles: [] };

  const { fileContent, pathParams } = ctx.req.body;

  let params: pageParams = {
    params: { _o: pathParams?.path?.substr(1)?.split("/") ?? [] },
    parsedPath: pathParams?.params ?? {},
    path: pathParams?.path ?? "/",
  };

  if (fileContent.getParams) {
    try {
      params = (await ctx.driver[fileContent.getParams](ctx)) || params;
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
      pageConfig: fileContent,
      params,
      key: "",
    })
  );
}
