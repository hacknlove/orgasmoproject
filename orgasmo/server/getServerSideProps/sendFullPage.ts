import CacheControl from "../lib/cacheControl"
import setCookies from "../lib/setCookies"

export default function sendFullPage ({ ctx, pageConfig }) {
    setCookies({ ctx, cookies: pageConfig.cookies })
    CacheControl({ ctx, item: pageConfig })
    return pageConfig.response
}