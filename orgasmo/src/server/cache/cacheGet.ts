import cacheExpireItem from "./cacheExpireItem";
import cacheHitItem from "./cacheHitItem";

export default async function cacheGet({ ctx, key }) {
  const item = await ctx.cache.get(key);

  if (!item) {
    return null;
  }

  if (item.timeChunk.expire < Date.now()) {
    cacheExpireItem({ ctx, key });
    return null;
  }

  cacheHitItem({ ctx, key, item });
  return item;
}
