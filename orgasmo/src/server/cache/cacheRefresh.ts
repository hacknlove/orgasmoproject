import events from "../events";
import cacheExpireItem from "./cacheExpireItem";
import newAutoRefreshInterval from "./cacheNewAutoRefreshInterval";
import { autoRefreshInterval, nextRevalidation } from "./maps";

export default async function cacheRefresh({ ctx, item, key }) {
  let newItem;
  try {
    newItem = await ctx.driver[item.autoRefresh.method](key);
  } catch (error) {
    events.emit("error", {
      type: "driver",
      method: item.autoRefresh.method,
      params: [key],
      error,
    });
  }
  if (!newItem) {
    cacheExpireItem({ ctx, key });
    return;
  }
  if (newItem.revalidate) {
    nextRevalidation.set(key, Date.now());
  } else if (!item.revalidate) {
    nextRevalidation.delete(key);
  }

  if (!newItem.autoRefresh) {
    clearInterval(autoRefreshInterval.get(key));
    autoRefreshInterval.delete(key);
  } else if (
    newItem.autoRefresh.method !== item.autoRefresh.method ||
    newItem.autoRefresh.ms !== item.autoRefresh.ms
  ) {
    clearInterval(autoRefreshInterval.get(key));
    newAutoRefreshInterval({ ctx, key, item: newItem });
  }

  ctx.cache.set(key, newItem);
}
