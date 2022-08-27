import { nextRevalidation } from "./maps";
import cacheExtendExpirationTimeout from "./cacheExtendExpirationTimeout";
import cacheRevalidate from "./cacheRevalidate";

export default function cacheHitItem({ driver, cache, key, item }) {
    cacheExtendExpirationTimeout({ cache, key, item })

    if (!item.revalidate) {
        return
    }

    const needsRevalidation = nextRevalidation.get(key) < Date.now()

    if (needsRevalidation) {
        cacheRevalidate({ driver, cache, key, item })
    }
}