import { useState } from "react"

export default function useItems({ items: itemsProp, getMore: getMoreProps }) {
    const [items, setItems] = useState(itemsProp)
    const [getMore, setGetMore] = useState(getMoreProps)
    const [loading, setLoading] = useState(false)


    async function getMoreItems (n) {
        if (!getMore) return
        setLoading(true)

        return fetch(`/api/_?c=${getMore}&from=${items.length}&count=${n}`)
            .then(res => res.json())
            .then(res => {
                setItems(items.concat(res.items))
                setGetMore(res.getMore)
                setLoading(false)
            })
        
    }

    return {
        items,
        loading,
        hasMore: Boolean(getMore),
        getMoreItems
    }
}