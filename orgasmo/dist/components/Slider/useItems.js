"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useItems({ items: itemsProp, src: srcProps }) {
    const [items, setItems] = (0, react_1.useState)(itemsProp);
    const [src, setSrc] = (0, react_1.useState)(srcProps);
    const [loading, setLoading] = (0, react_1.useState)(false);
    async function getMoreItems(n) {
        if (!src)
            return;
        setLoading(true);
        const url = new URL(src, window.location);
        url.searchParams.append("from", items.length);
        url.searchParams.append("count", n);
        return fetch(url)
            .then((res) => res.json())
            .then((res) => {
            setItems(items.concat(res.items));
            setSrc(res.src);
            setLoading(false);
        });
    }
    return {
        items,
        loading,
        hasMore: Boolean(src),
        getMoreItems,
    };
}
exports.default = useItems;
//# sourceMappingURL=useItems.js.map