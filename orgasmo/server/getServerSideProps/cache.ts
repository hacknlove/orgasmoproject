import { cencode } from 'cencode';
import { cacheItemHit, cacheNewItem, cacheExpireItem } from '../lib/cache';

const Cache = new Map()

function getPageKey({ ctx }) {
    return cencode([ ctx.params, ctx.req.roles ])
}

export async function cachedPage({ driver, ctx }) {
    let cache = driver.page.cache ?? Cache

    const key = (driver.page.key ?? getPageKey)({ driver, ctx })

    let pageConfig = await cache.get(key)

    if (pageConfig?.expire > Date.now()) {
        cacheExpireItem({ cache, key })
        pageConfig = null
    }

    if (pageConfig) {
        ctx.waitFor.push(() => cacheItemHit({ driver, cache, key, item: pageConfig }))
        return pageConfig;
    }

    pageConfig = await driver.page.getPage(ctx)
    if (!pageConfig) {
        return null
    }

    ctx.waitFor.push(() => cacheNewItem({
        driver,
        cache,
        key,
        item: pageConfig,
    }))
    return pageConfig
}
