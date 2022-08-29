import cacheGet from "../cache/cacheGet"
import getPageCacheKeys from "./getPageCacheKeys"

export default async function getCachedPage({ driver, ctx, cache }) {
    const keys = getPageCacheKeys({ driver, ctx })

    let pageConfig
    for await (const key of keys) {
      pageConfig = await cacheGet({ driver, cache, key })
      if (pageConfig) {
        return {
          key,
          pageConfig
        }
      }
    }

    return {}
}