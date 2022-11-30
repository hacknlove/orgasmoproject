import getCachedPage from "./getCachedPage";
import getPageFromConfig from "./getPageFromConfig";
import getCachedPageVariant from "./getCachedPageVariant";
import events from "../events";
import sendFullPage from "./sendFullPage";

export default async function getPageConfig(ctx) {
  // get a cached version
  const { key, pageConfig } = await getCachedPage(ctx);

  // if there is no cached page, generate a new page from pageConfig
  if (!pageConfig) {
    return getPageFromConfig(ctx);
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
