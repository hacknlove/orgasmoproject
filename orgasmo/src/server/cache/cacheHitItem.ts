import { nextRevalidation } from "./maps";
import cacheExtendExpirationTimeout from "./cacheExtendExpirationTimeout";
import cacheRevalidate from "./cacheRevalidate";

export default function cacheHitItem({ ctx, key, item }) {
  cacheExtendExpirationTimeout({ ctx, key, item });

  if (!item.revalidate) {
    return;
  }

  const needsRevalidation = nextRevalidation.get(key) < Date.now();

  if (needsRevalidation) {
    cacheRevalidate({ ctx, key, item });
  }
}
