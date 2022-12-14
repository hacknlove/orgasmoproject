import logger from "@orgasmo/orgasmo/logger";

const configs = {
  site: {
    method: "admin.deleteSiteConfig",
    getParams: () => [],
    getResponse: () => ({}),
  },
  component: {
    method: "admin.deleteStoryConfig",
    getParams: (splitedPath) => [
      {
        component: splitedPath[2],
        story: splitedPath[3],
      },
    ],
    getResponse: (splitedPath) => ({
      type: "component",
      component: splitedPath[2],
      story: splitedPath[3],
    }),
  },
  page: {
    method: "admin.deletePageConfig",
    getParams: (splitedPath) => [splitedPath[2]],
    getResponse: (splitedPath) => ({
      type: "page",
      pageId: splitedPath[2],
    }),
  },
};

export default async function deleteFileApi(ctx) {
  const filePath = ctx.req.body.filePath;

  if (!filePath) {
    ctx.res.json({
      error: {
        title: "Wrong Parameters",
        text: "Missing filePath",
      },
    });
  }

  const splitedPath = ctx.req.body.filePath.split("/");

  const config = configs[splitedPath[1]];

  if (!ctx.driver[config.method]) {
    ctx.res.json({
      error: {
        name: "Missing Method",
        message: `The driver have no ${config.method} method`,
      },
    });
    return;
  }

  try {
    await ctx.driver[config.method](ctx, ...config.getParams(splitedPath));

    ctx.res.json(config.getResponse(splitedPath));
    return;
  } catch (error) {
    logger.error(error, "File %s could not be deleted", filePath);

    ctx.res.json({
      error: {
        name: "Error",
        message: `File ${filePath} could not be deleted`,
        error,
      },
    });
    return;
  }
}
