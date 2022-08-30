import { cencode } from "cencode";
import expandPage from "./expandPage";
import events from "../events";
import chooseOne from "../lib/chooseOne";
import cacheNewItem from "../cache/cacheNewItem";
import sendFullPage from "./sendFullPage";

type pageParams = Record<string, any>;

export default async function getNewFullPage(ctx) {
  let pageConfig;
  try {
    pageConfig = await ctx.driver.page.getPage(ctx);
  } catch (error) {
    events.emit("error", {
      type: "driver",
      method: "page.getPage",
      params: [ctx],
      error,
    });
  }

  if (!pageConfig) {
    return null;
  }

  const pageIds =
    Array.isArray(pageConfig) && pageConfig.map((page) => page.id);

  if (pageIds) {
    pageConfig = chooseOne({ array: pageConfig, ctx });
  }

  let params: pageParams = { params: ctx.params, roles: ctx.req.user.roles };

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
      return null;
    }
  }

  if (pageIds) {
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

  const response = await expandPage({ ctx, pageConfig, params, key });

  pageConfig = {
    timeChunk: pageConfig.timeChunk,
    revalidate: pageConfig.revalidate,
    autoRefresh: pageConfig.autoRefresh,
    response,
  };

  await cacheNewItem({
    ctx,
    key: cencode(params),
    item: pageConfig,
  });

  return sendFullPage({
    ctx,
    pageConfig,
  });
}
