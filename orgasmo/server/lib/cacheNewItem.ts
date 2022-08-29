import cacheNewAutoRefreshInterval from "../cache/cacheNewAutoRefreshInterval";
import cacheNewExpirationTimeout from "../cache/cacheNewExpirationTimeout";
import { nextRevalidation } from "../cache/maps";

export function cacheNewItem({ ctx, key, item }) {
  if (item.noCache) {
    return;
  }
  if (item.autoRefresh) {
    cacheNewAutoRefreshInterval({ ctx, key, item });
  }

  if (item.timeChunk.expire) {
    cacheNewExpirationTimeout({ ctx, key, item });
  }

  if (item.revalidate) {
    nextRevalidation.set(key, new Date());
  }
  return ctx.cache.set(key, item);
}
