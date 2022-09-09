import cacheGet from "../cache/cacheGet";
import getPageCacheKeys from "./getPageCacheKeys";

export default async function getCachedPage(ctx) {
  const keys = await getPageCacheKeys(ctx);

  for await (const key of keys) {
    const pageConfig = await cacheGet({ ctx, key });
    if (pageConfig) {
      return {
        key,
        pageConfig,
      };
    }
  }

  return {};
}
