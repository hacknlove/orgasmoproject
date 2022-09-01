import cacheNewAutoRefreshInterval from "../cache/cacheNewAutoRefreshInterval";
import cacheNewExpirationTimeout from "../cache/cacheNewExpirationTimeout";
import { nextRevalidation } from "../cache/maps";
import { currentTimeChunk } from "./timechunks";

export default function cacheNewItem({ ctx, key, item }) {
  if (item.noCache || !item.timeChunk || ctx.noCache) {
    return;
  }
  if (item.autoRefresh) {
    cacheNewAutoRefreshInterval({ ctx, key, item });
  }

  cacheNewExpirationTimeout({ ctx, key, item });

  if (item.revalidate) {
    nextRevalidation.set(key, currentTimeChunk().revalidate);
  }
  return ctx.cache.set(key, item);
}
