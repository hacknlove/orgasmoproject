import { useState, useRef } from "react";

export default function useItems({ items: itemsProp, src: srcProps }) {
  const [items, setItems] = useState(itemsProp);
  const [src, setSrc] = useState(srcProps);
  const [loading, setLoading] = useState(false);
  const gettingMore = useRef();

  async function getMoreItems(n) {
    if (!src) return;
    if (gettingMore.current) {
      return;
    }
    setLoading(true);

    const url = new URL(src, window.location);
    url.searchParams.append("from", items.length);
    url.searchParams.append("count", n);

    gettingMore.current = true;
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setItems(items.concat(res.items));
        items.push(...res.items);
        setSrc(res.src);
        setLoading(false);
      });

    gettingMore.current = false;
  }

  return {
    items,
    loading,
    hasMore: Boolean(src),
    getMoreItems,
  };
}
