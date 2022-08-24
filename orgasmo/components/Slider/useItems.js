import { useState } from "react"

export default function useItems({ items: itemsProp, src: srcProps }) {
    const [items, setItems] = useState(itemsProp)
    const [src, setSrc] = useState(srcProps)
    const [loading, setLoading] = useState(false)


    async function getMoreItems (n) {
        if (!src) return
        setLoading(true)

        const url = new URL(src, window.location)
        url.searchParams.append('from', items.length)
        url.searchParams.append('count', n)

        return fetch(url)
            .then(res => res.json())
            .then(res => {
                setItems(items.concat(res.items))
                setSrc(res.src)
                setLoading(false)
            })
    }

    return {
        items,
        loading,
        hasMore: Boolean(src),
        getMoreItems
    }
}