import CacheControl from "../lib/cacheControl"
import setCookies from "../lib/setCookies"
import getCachedPage from "./getCachedPage"
import { getNewFullPage } from "./getNewFullPage"
import getCachedPageVariant from './getCachedPageVariant'
import events from "../events"

export default async function getPage(ctx) {
    const {
        key,
        cached
    } = await getCachedPage(ctx)

    if (!cached) {
        return getNewFullPage(ctx)
    }
    
    if (cached.response) {
        setCookies({ ctx, cookies: cached.cookies })
        CacheControl({ ctx, item: cached })
        return cached.response
    }

    if (cached.pages) {
        return getCachedPageVariant({ cache, cached, ctx, driver, key })
    }

    events.emit('error', {
        type: 'internal',
        message: 'Cached page is not full neither variant'
    })
    
    return {
        notFound: true
    }
} 

