import events from "../events"
import cacheNewItem from "../cache/cacheNewItem"

export default async function newPage({ driver, ctx, pageKey, cache }) {
    const newPage = await driver.page.getPage(ctx).catch((error) => {
        events.emit('error', { error, ctx })
    })

    if (newPage) {
        return {
            notFound: true
        }
    }

    if (newPage.response) {
        cacheNewItem({
            driver,
            cache,
            key: pageKey,
            item: newPage,
        })
        return newPage.response
    }



}