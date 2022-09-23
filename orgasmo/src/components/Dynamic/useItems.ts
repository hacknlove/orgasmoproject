import { useCallback, useRef, useState, useEffect } from "react";
import useScroll from "./useScroll";

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

export default function useItems({
  src: srcProps,
  items: itemsProp,
  mode,
  threshold = 50,
}) {
  const [items, setItems] = useState<any[]>(itemsProp);
  const [src, setSrc] = useState(srcProps);
  const [noMore, setNoMore] = useState(false);
  const [overTheTopItems, setOverTheTopItems] = useState([] as number[]);
  const [underTheBottomItems, setUnderTheBottomItems] = useState(
    [] as number[]
  );
  const wait = useRef(Promise.resolve(undefined));

  if (process.env.NODE_ENV === "development") {
    useEffect(() => {
      setItems(itemsProp);
    }, [itemsProp]);
  }

  const onHideBottom = useCallback(
    (element) => {
      setUnderTheBottomItems((current) => [
        ...current,
        element.getClientRects()[0].height,
      ]);
      (wait as any).working = false;
    },
    [setUnderTheBottomItems]
  );

  const onHideTop = useCallback(
    (element) => {
      let max = 0;
      const heights: number[] = [];
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

      setOverTheTopItems((current: any) => [...current, ...heights]);

      (wait as any).working = false;
    },
    [setOverTheTopItems]
  );

  const onShowTop = useCallback(() => {
    setOverTheTopItems((current) => {
      (wait as any).working = false;
      if (current.length <= 1) return [];
      let zeros = 0;
      while (current[current.length - 2 - zeros] === 0) {
        zeros++;
      }

      return current.slice(0, current.length - 1 - zeros);
    });
  }, [setOverTheTopItems]);

  const unHideBottom = useCallback(() => {
    setUnderTheBottomItems((current) => {
      (wait as any).working = false;
      if (current.length <= 1) return [];
      return current.slice(0, current.length - 1);
    });
  }, [setUnderTheBottomItems]);

  const getItemConfig = useCallback(async () => {
    if (noMore || !src) {
      (wait as any).working = false;
      return;
    }

    let resolveWait;
    const myWait = wait.current;
    wait.current = new Promise((res) => (resolveWait = res));
    await myWait;

    const items: any[] = await new Promise((resolveItems) => {
      setItems((current) => {
        resolveItems(current);
        return current;
      });
    });
    (wait as any).working = false;

    const url = new URL(src, window.location.href);
    url.searchParams.append("n", items.length.toString());

    const row = src && (await cachedFetch(url.toString()));

    if (!row) {
      setNoMore(true);
      resolveWait();
      (wait as any).working = false;
      return;
    }

    setItems((current) => [...current, row.row]);
    setSrc(row.src);

    resolveWait();
    (wait as any).working = false;
  }, [noMore, setItems, setNoMore, src, wait]);

  const ref = useScroll({
    threshold,
    wait,
    onHideBottom,
    onHideTop: mode === "bubble" && onHideTop,
    onShowBottom: underTheBottomItems.length
      ? unHideBottom
      : noMore
      ? undefined
      : getItemConfig,
    onShowTop:
      mode === "bubble" && overTheTopItems.length ? onShowTop : undefined,
  });

  useEffect(() => {
    let idleCallback;
    function autoFetch() {
      idleCallback = (window.requestIdleCallback ?? window.setTimeout)(() => {
        if (
          overTheTopItems.length ||
          underTheBottomItems.length ||
          noMore ||
          !ref.current
        ) {
          return;
        }
        const lastElement = ref.current.lastElementChild;
        if (!lastElement) {
          idleCallback = autoFetch();
          return;
        }
        const lastElementClientRect = lastElement?.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (
          lastElementClientRect.y - lastElementClientRect.height - threshold <
          windowHeight
        ) {
          getItemConfig();
        }
      });
    }
    autoFetch();
    return () =>
      (window.cancelIdleCallback ?? window.clearTimeout)(idleCallback);
  }, [items, underTheBottomItems, overTheTopItems]);

  return {
    items: items.slice(
      overTheTopItems.length,
      items.length - underTheBottomItems.length
    ) as any[],
    getItemConfig,
    ref,
    overTheTop: overTheTopItems.reduce((r, i) => r + i, 0),
    underTheBottom: underTheBottomItems.reduce((r, i) => r + i, 0),
    keyOffset: overTheTopItems.length,
    overTheTopItems,
    underTheBottomItems,
  };
}
