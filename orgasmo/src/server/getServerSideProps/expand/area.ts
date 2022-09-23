import getItems from "../getItems";

export async function expandArea ({ ctx, params, timeChunk, areaConfig }) {
    const items = getItems({
        ctx,
        params,
        items: areaConfig.items,
        limit: areaConfig.ssrSize,
        timeChunk,
        getItem: areaConfig.getItem,

    })

    return {
        ...areaConfig,
        items
    }
} 