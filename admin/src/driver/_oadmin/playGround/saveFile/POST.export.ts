import * as pageConfigSchema from "../../../../schemas/pageConfigSchema.json";
import logger from "@orgasmo/orgasmo/logger";

const configs = {
  page: {
    method: "admin.savePageConfig",
    schema: pageConfigSchema,
    getResponse: (content) => ({
      type: "page",
      filePath: `/page/${content.pageId}`,
      path: content.exactPath ?? content.patternPath,
      pageId: content.pageId,
      description: content.description ?? "",
    }),
  },
  component: {
    method: "admin.saveStoryConfig",
    schema: null,
    getResponse: (content) => ({
      type: "component",
      filePath: `/component/${content.itemConfig.type}/${content.story}`,
      component: content.itemConfig.type,
      story: content.story,
      description: content.description ?? "",
    }),
  },
  site: {
    method: "admin.saveSiteConfig",
    schema: null,
    getResponse: (content) => ({
      type: "site",
      filePath: `/site/config`,
      description: content.description ?? "",
    }),
  },
};

export default async function saveFileApi(ctx) {
  const content = ctx.req.body;

  let config;
  if (content.pageId) {
    config = configs.page;
  } else if (content.story) {
    config = configs.component;
  } else {
    config = configs.site;
  }

  if (!ctx.driver[config.method]) {
    ctx.res.json({
      error: {
        name: "Missing Method",
        message: `The driver has no ${config.method} method`,
      },
    });
    return;
  }

  try {
    await ctx.driver[config.method](ctx, content);
    ctx.res.json(config.getResponse(content));
    return;
  } catch (error) {
    logger.error(error, "Missing method");
    ctx.res.json({ error });
    return;
  }
}
