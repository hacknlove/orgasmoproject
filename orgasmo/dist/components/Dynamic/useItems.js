"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useScroll_1 = require("./useScroll");
const fetchMap = new Map();
async function cachedFetch(url) {
    if (fetchMap.has(url)) {
        return fetchMap.get(url);
    }
    const response = fetch(url)
        .then((res) => res.json())
        .catch((e) => {
        console.error(e);
        return false;
    });
    fetchMap.set(url, response);
    return response;
}
function useItems({ src: srcProps, items: itemsProp, mode, threshold = 50, }) {
    const [items, setItems] = (0, react_1.useState)(itemsProp);
    const [src, setSrc] = (0, react_1.useState)(srcProps);
    (0, react_1.useEffect)(() => {
        setSrc(srcProps);
    }, [srcProps]);
    const [noMore, setNoMore] = (0, react_1.useState)(false);
    const [overTheTopItems, setOverTheTopItems] = (0, react_1.useState)([]);
    const [underTheBottomItems, setUnderTheBottomItems] = (0, react_1.useState)([]);
    const wait = (0, react_1.useRef)(Promise.resolve(undefined));
    if (process.env.NODE_ENV === "development") {
        (0, react_1.useEffect)(() => {
            setItems(itemsProp);
        }, [itemsProp]);
    }
    const onHideBottom = (0, react_1.useCallback)((element) => {
        setUnderTheBottomItems((current) => [
            ...current,
            element.getClientRects()[0].height,
        ]);
        wait.working = false;
    }, [setUnderTheBottomItems]);
    const onHideTop = (0, react_1.useCallback)((element) => {
        let max = 0;
        const heights = [];
        let elementRect = element.getBoundingClientRect();
        do {
            const nextElement = element.nextElementSibling;
            const nextElementRect = nextElement?.getBoundingClientRect() ?? {};
            max = Math.max(max, elementRect.height);
            if (nextElementRect.y !== elementRect.y) {
                heights.push(max);
                break;
            }
            heights.push(0);
            element = nextElement;
            elementRect = nextElementRect;
        } while (true);
        setOverTheTopItems((current) => [...current, ...heights]);
        wait.working = false;
    }, [setOverTheTopItems]);
    const onShowTop = (0, react_1.useCallback)(() => {
        setOverTheTopItems((current) => {
            wait.working = false;
            if (current.length <= 1)
                return [];
            let zeros = 0;
            while (current[current.length - 2 - zeros] === 0) {
                zeros++;
            }
            return current.slice(0, current.length - 1 - zeros);
        });
    }, [setOverTheTopItems]);
    const unHideBottom = (0, react_1.useCallback)(() => {
        setUnderTheBottomItems((current) => {
            wait.working = false;
            if (current.length <= 1)
                return [];
            return current.slice(0, current.length - 1);
        });
    }, [setUnderTheBottomItems]);
    const getItemConfig = (0, react_1.useCallback)(async () => {
        if (noMore || !src) {
            wait.working = false;
            return;
        }
        let resolveWait;
        const myWait = wait.current;
        wait.current = new Promise((res) => (resolveWait = res));
        await myWait;
        const items = await new Promise((resolveItems) => {
            setItems((current) => {
                resolveItems(current);
                return current;
            });
        });
        wait.working = false;
        const url = new URL(src, window.location.href);
        url.searchParams.append("n", items.length.toString());
        const row = src && (await cachedFetch(url.toString()));
        if (!row) {
            setNoMore(true);
            resolveWait();
            wait.working = false;
            return;
        }
        setItems((current) => [...current, row.row]);
        setSrc(row.src);
        resolveWait();
        wait.working = false;
    }, [noMore, setItems, setNoMore, src, wait]);
    const ref = (0, useScroll_1.default)({
        threshold,
        wait,
        onHideBottom,
        onHideTop: mode === "bubble" && onHideTop,
        onShowBottom: underTheBottomItems.length
            ? unHideBottom
            : noMore
                ? undefined
                : getItemConfig,
        onShowTop: mode === "bubble" && overTheTopItems.length ? onShowTop : undefined,
    });
    (0, react_1.useEffect)(() => {
        let idleCallback;
        function autoFetch() {
            idleCallback = (window.requestIdleCallback ?? window.setTimeout)(() => {
                if (overTheTopItems.length ||
                    underTheBottomItems.length ||
                    noMore ||
                    !ref.current) {
                    return;
                }
                const lastElement = ref.current.lastElementChild;
                if (!lastElement) {
                    idleCallback = autoFetch();
                    return;
                }
                const lastElementClientRect = lastElement?.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                if (lastElementClientRect.y - lastElementClientRect.height - threshold <
                    windowHeight) {
                    getItemConfig();
                }
            });
        }
        autoFetch();
        return () => (window.cancelIdleCallback ?? window.clearTimeout)(idleCallback);
    }, [items, underTheBottomItems, overTheTopItems]);
    return {
        items: items.slice(overTheTopItems.length, items.length - underTheBottomItems.length),
        getItemConfig,
        ref,
        overTheTop: overTheTopItems.reduce((r, i) => r + i, 0),
        underTheBottom: underTheBottomItems.reduce((r, i) => r + i, 0),
        keyOffset: overTheTopItems.length,
        overTheTopItems,
        underTheBottomItems,
    };
}
exports.default = useItems;
//# sourceMappingURL=useItems.js.map