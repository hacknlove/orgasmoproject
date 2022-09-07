import { cencode } from "cencode";
import expandPage from "./expandPage";
import events from "../events";
import chooseOne from "../lib/chooseOne";
import cacheNewItem from "../cache/cacheNewItem";
import sendFullPage from "./sendFullPage";

type pageParams = Record<string, any>;

export default async function getPageFromConfig(ctx) {
  let pageConfig;
  try {
    pageConfig = await ctx.driver.page.getPageConfig(ctx);
  } catch (error) {
    events.emit("error", {
      type: "driver",
      method: "page.getPageConfig",
      params: [ctx],
      error,
    });
  }

  if (!pageConfig) {
    return {
      notFound: true,
    };
  }

  const pageIds =
    Array.isArray(pageConfig) && pageConfig.map((page) => page.id);

  if (pageIds) {
    pageConfig = chooseOne({ array: pageConfig, ctx });
  }

  let params: pageParams = {
    params: ctx.params,
    path: ctx.resolvedUrl.replace(/\?.*$/, ""),
    roles: ctx.req.user.roles,
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
    params.pageId = pageConfig.id;
  }

  const key = cencode(params);

  const response =
    pageConfig.response || (await expandPage({ ctx, pageConfig, params, key }));

  pageConfig = {
    timeChunk: pageConfig.timeChunk,
    revalidate: pageConfig.revalidate,
    autoRefresh: pageConfig.autoRefresh,
    response,
  };

  if (pageIds) {
    pageConfig.private = true;
  }

  if (!ctx.noCache && pageConfig.timeChunk && !pageConfig.private) {
    await cacheNewItem({
      ctx,
      key: cencode(params),
      item: pageConfig,
    });
  }

  return sendFullPage({
    ctx,
    pageConfig,
  });
}
