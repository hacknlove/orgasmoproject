const configs = {
  value: {
    method: "kvStorage.getValue",
    getParams: (ctx, splitedPath) => [ctx, splitedPath[2]],
  },
  component: {
    method: "admin.getComponentStory",
    getParams: (ctx, splitedPath) => [
      {
        component: splitedPath[2],
        story: splitedPath[3],
      },
    ],
    getDefault: (splitedPath) => ({
      story: splitedPath[3],
      description: "Create a new story",
      itemConfig: {
        type: splitedPath[2],
        props: {},
      },
    }),
  },
  page: {
    method: "page.getPageConfigFromId",
    getParams: (ctx, splitedPath) => [splitedPath[2]],
  },
};

export default async function getFile(ctx) {
  const splitedPath = ctx.req.body.filePath.split("/");

  const config = configs[splitedPath[1]];

  if (!ctx.driver[config.method]) {
    return ctx.res.json({
      error: {
        name: "Missing Method",
        message: `The driver have no ${config.method} method`,
      },
    });
  }

  const content = (await ctx.driver[config.method](
    ...config.getParams(ctx, splitedPath)
  )) ??
    config.getDefault?.(splitedPath) ?? {
      error: `${ctx.req.body.filePath} not found`,
    };

  ctx.res.json(content);
}
