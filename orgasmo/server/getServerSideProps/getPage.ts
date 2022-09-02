import getCachedPage from "./getCachedPage";
import getNewFullPage from "./getNewFullPage";
import getCachedPageVariant from "./getCachedPageVariant";
import events from "../events";
import sendFullPage from "./sendFullPage";

export default async function getPage(ctx) {
  if (ctx.noCache) {
    return getNewFullPage(ctx);
  }
  const { key, pageConfig } = await getCachedPage(ctx);

  if (!pageConfig) {
    return getNewFullPage(ctx);
  }

  if (pageConfig.response) {
    return sendFullPage({ ctx, pageConfig });
  }

  if (pageConfig.pageIds) {
    return getCachedPageVariant({ pageIds: pageConfig.pageIds, ctx, key });
  }

  events.emit("error", {
    type: "internal",
    message: "Cached page is not full neither variant",
  });

  return {
    notFound: true,
  };
}
