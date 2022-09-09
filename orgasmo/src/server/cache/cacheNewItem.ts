import cacheNewAutoRefreshInterval from "./cacheNewAutoRefreshInterval";
import cacheNewExpirationTimeout from "./cacheNewExpirationTimeout";
import { nextRevalidation } from "./maps";

export default function cacheNewItem({ ctx, key, item }) {
  if (!item.timeChunk || ctx.noCache) {
    return;
  }
  if (item.autoRefresh) {
    cacheNewAutoRefreshInterval({ ctx, key, item });
  }

  cacheNewExpirationTimeout({ ctx, key, item });

  if (item.revalidate) {
    nextRevalidation.set(key, new Date());
  }
  return ctx.cache.set(key, item);
}
