import cacheGet from "../cache/cacheGet";
import getPageCacheKeys from "./getPageCacheKeys";

export default async function getCachedPage(ctx) {
  const keys = getPageCacheKeys(ctx);

  let pageConfig;
  for await (const key of keys) {
    pageConfig = await cacheGet({ ctx, key });
    if (pageConfig) {
      return {
        key,
        pageConfig,
      };
    }
  }

  return {};
}
