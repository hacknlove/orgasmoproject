import { cencode } from 'cencode';
import cacheExpireItem from '../cache/cacheExpireItem';
import cacheHitItem from '../cache/cacheHitItem';

const Cache = new Map()

function getPageKey(ctx) {
    return cencode([ ctx.params, ctx.req.roles ])
}

export async function getCachedPage({ driver, ctx }) {
    let cache = driver.page.cache ?? Cache

    const key = (driver.page.key ?? getPageKey)(ctx)

    let cachedPage = await cache.get(key)

    if (!cachedPage) {
        return {
            pageKey: key,
            cache,
            cachedPage: null
        }
    }
    if (cachedPage?.expire > Date.now()) {
        cacheExpireItem({ cache, key })
        return {
            pageKey: key,
            cache,
            cachedPage: null
        }
    }
    cacheHitItem({ driver, cache, key, item: cachedPage })

    return {
        pageKey: key,
        cache,
        cachedPage
    }
}
