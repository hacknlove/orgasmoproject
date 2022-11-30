import { cencode } from "cencode";
import expandPage from "./expand/pageConfig";
import events from "../events";
import chooseOne from "../lib/chooseOne";
import cacheNewItem from "../cache/cacheNewItem";
import sendFullPage from "./sendFullPage";
import filterCriteria from "../lib/filterCriteria";
import logger from "../logger";

type pageParams = Record<string, any>;

export default async function getPageFromConfig(ctx) {
  let pageConfig;
  try {
    pageConfig = await ctx.driver.page.getPageConfig(ctx);
  } catch (error) {
    logger.error(
      {
        error,
        ctx,
      },
      "Driver error at page.getPageConfig"
    );
  }

  if (!pageConfig || pageConfig.length === 0) {
    return {
      notFound: true,
    };
  }

  if (!Array.isArray(pageConfig)) {
    pageConfig = [pageConfig];
  }

  pageConfig = filterCriteria(pageConfig, "roles", ctx.req.user.roles);
  pageConfig = filterCriteria(pageConfig, "labels", ctx.req.labels);

  if (!pageConfig || pageConfig.length === 0) {
    return {
      notFound: true,
    };
  }

  const pageIds = pageConfig.map((page) => page.pageId);

  pageConfig = pageConfig[1]
    ? chooseOne({ array: pageConfig, ctx })
    : pageConfig[0];

  let params: pageParams = {
    params: ctx.params,
    parsedPath: ctx.parsedPath,
    path: ctx.resolvedUrl.replace(/\?.*$/, ""),
    roles: ctx.req.user.roles,
    labels: ctx.req.labels,
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

  if (pageIds && !ctx.noCache) {
    await cacheNewItem({
      ctx,
      key: cencode(params),
      item: {
        timeChunk: pageConfig.timeChunk,
        revalidate: pageConfig.revalidate,
        autoRefresh: pageConfig.autoRefresh,
        pageIds,
      },
    });
    params.pageId = pageConfig.pageId;
  }

  const key = cencode(params);

  const page = {
    timeChunk: pageConfig.timeChunk,
    revalidate: pageConfig.revalidate,
    autoRefresh: pageConfig.autoRefresh,
    private: pageConfig.private || pageIds.length > 1,
    response:
      pageConfig.response ||
      (await expandPage({ ctx, pageConfig, params, key })),
  };

  if (!ctx.noCache && pageConfig.timeChunk && !pageConfig.private) {
    await cacheNewItem({
      ctx,
      key,
      item: page,
    });
  }

  return sendFullPage({
    ctx,
    pageConfig: page,
  });
}
