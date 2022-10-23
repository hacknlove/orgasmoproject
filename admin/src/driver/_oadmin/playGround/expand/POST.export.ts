import expandPageConfig from "@orgasmo/orgasmo/expandPageConfig";
import events from "@orgasmo/orgasmo/events";

type pageParams = Record<string, any>;

function wrapComponent(fileContent) {
  return {
    areas: {
      renderComponent: {
        items: [fileContent.itemConfig],
      },
    },
  };
}

export default async function expandPageConfigApi(ctx) {
  ctx.req.user = { roles: [] };

  const { pathParams, filePath } = ctx.req.body;

  let fileContent = ctx.req.body.fileContent;

  if (filePath.startsWith("/component/")) {
    fileContent = wrapComponent(fileContent);
  }

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
