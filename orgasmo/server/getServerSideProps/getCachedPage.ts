import cacheGet from "../cache/cacheGet"
import getPageCacheKeys from "./getPageCacheKeys"

export default async function getCachedPage({ driver, ctx, cache }) {
    const keys = getPageCacheKeys({ driver, ctx })

    let cached
    for await (const key of keys) {
      cached = await cacheGet({ driver, cache, key })
      if (cached) {
        return {
          key,
          cached
        }
      }
    }

    return {}
}