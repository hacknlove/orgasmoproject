import getCache from "../cache/cacheFactory"
import setCookies from "../lib/setCookies"
import expandPage from "./expandPage"
import getCachedPage from "./getCachedPage"
import { getNewFullPage } from "./getNewFullPage"
import getUser from "./getUser"

export default async function getPage({ ctx, driver }) {
    const [ user, cache ] = await Promise.all([
        getUser({ driver, ctx }),
        getCache({ driver }),
    ])
    ctx.req.user = user
    ctx.cache = cache
    ctx.setCookies = []
    ctx.rewrites = 0
    
    const {
        key,
        cached
    } = await getCachedPage({ driver, ctx, cache })
    
    if (cached?.response) {
        setCookies({ ctx, cookies: cached.cookies })
        if (cached.CacheControl) {
            ctx.res.setHeader(
                'Cache-Control',
                cached.CacheControl
            )
        }
        return cached.response
    }
    
    const page = cached
    ? await expandPage({ cache, pageConfig: cached, ctx, driver, key })
    : await getNewFullPage({ ctx, driver, cache })
    

    if (!page) {
        return {
            notFound: true
        }
    }

    setCookies({ ctx, cookies: page.cookies });
    if (page.CacheControl) {
        ctx.res.setHeader(
            'Cache-Control',
            page.CacheControl
        )
    }

    return page.response
} 

/*    
|| await getFull


const cachedPage = 


let key = cencode([ ])
const fullPageKey = 
const {
    pageKey,
    cachedPage,
} = await getFullCachedPage({ ctx, driver })

if (!cachedPage) {
    return newPage({ ctx, driver, pageKey, cache })
}

if (!cachedPage.props) {
    setCookies({ ctx, cookies: cachedPage.cookies });
    return cachedPage.props;
}



const props = expandPage({
    cache, ctx, driver, pageConfig: cachedPage, pageKey 
})

if (!cachedPage.noCache && !ctx.noCacheFull) {
    cacheNewItem({
        driver,
        cache,
        key: pageKey,
        item: {
            autoRefresh: cachedPage.autoRefresh,
            expire: cachedPage.expire,
            revalidate: cachedPage.revalidate,
            timeChunks: cachedPage.timeChunks,
            expand: 'page',
            props
        },
    })
}
return props;
}
}

*/