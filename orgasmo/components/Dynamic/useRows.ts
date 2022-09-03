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

export default function useRows({
  src: srcProps,
  rows: rowsProp,
  threshold = 50,
}) {
  const [rows, setRows] = useState<any[]>(rowsProp);
  const [src, setSrc] = useState(srcProps);
  const [noMore, setNoMore] = useState(false);
  const [overTheTopRows, setOverTheTopRows] = useState([] as number[]);
  const [underTheBottomRows, setUnderTheBottomRows] = useState([] as number[]);
  const wait = useRef(Promise.resolve(undefined));

  const onHideBottom = useCallback(
    (element) => {
      setUnderTheBottomRows((current) => [
        ...current,
        element.getClientRects()[0].height,
      ]);
      (wait as any).working = false;
    },
    [setUnderTheBottomRows]
  );

  const onHideTop = useCallback(
    (element) => {
      let max = 0
      const heights: number[] = []
      let elementRect = element.getBoundingClientRect()

      do {
        const nextElement = element.nextElementSibling
        const nextElementRect = nextElement?.getBoundingClientRect() ?? {}

        max = Math.max(max, elementRect.height)
        if (nextElementRect.y !== elementRect.y) {
          heights.push(max)
          break
        }
        heights.push(0)
        element = nextElement
        elementRect = nextElementRect
      } while (true)

      setOverTheTopRows((current: any) => [
        ...current,
        ...heights,
      ]);

      (wait as any).working = false;
    },
    [setOverTheTopRows]
  );

  const onShowTop = useCallback(() => {
    setOverTheTopRows((current) => {
      (wait as any).working = false;
      if (current.length <= 1) return [];
      let zeros = 0
      while (current[current.length -2 -zeros] === 0) {
        zeros++
      }
      
      return current.slice(0, current.length - 1 - zeros);
    });
  }, [setOverTheTopRows]);

  const unHideBottom = useCallback(() => {
    setUnderTheBottomRows((current) => {
      (wait as any).working = false;
      if (current.length <= 1) return [];
      return current.slice(0, current.length - 1);
    });
  }, [setUnderTheBottomRows]);

  const getRow = useCallback(async () => {
    if (noMore || !src) {
      (wait as any).working = false;
      return;
    }

    let resolveWait;
    const myWait = wait.current;
    wait.current = new Promise((res) => (resolveWait = res));
    await myWait;

    const rows: any[] = await new Promise((resolveRows) => {
      setRows((current) => {
        resolveRows(current);
        return current;
      });
    });
    (wait as any).working = false;

    const url = new URL(src, window.location.href);
    url.searchParams.append("n", rows.length.toString());

    const row = src && (await cachedFetch(url.toString()));

    if (!row) {
      setNoMore(true);
      resolveWait();
      (wait as any).working = false;
      return;
    }

    setRows((current) => [...current, row.row]);
    setSrc(row.src);

    resolveWait();
    (wait as any).working = false;
  }, [noMore, setRows, setNoMore, src, wait]);

  const ref = useScroll({
    threshold,
    wait,
    onHideBottom,
    onHideTop,
    onShowBotton: underTheBottomRows.length
      ? unHideBottom
      : noMore
      ? undefined
      : getRow,
    onShowTop: overTheTopRows.length ? onShowTop : undefined,
  });

  useEffect(() => {
    const idleCallback = (window.requestIdleCallback ?? window.setTimeout)(
      () => {
        if (
          overTheTopRows.length ||
          underTheBottomRows.length ||
          noMore ||
          !ref.current
        ) {
          return;
        }
        const lastElement = ref.current.lastElementChild;
        if (!lastElement) {
          return;
        }
        const lastElementClientRect = lastElement?.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (
          lastElementClientRect.y - lastElementClientRect.height - threshold <
          windowHeight
        ) {
          getRow();
        }
      }
    );
    return () =>
      (window.cancelIdleCallback ?? window.clearTimeout)(idleCallback);
  }, [rows, underTheBottomRows, overTheTopRows]);

  return {
    rows: rows.slice(
      overTheTopRows.length,
      rows.length - underTheBottomRows.length
    ) as any[],
    getRow,
    ref,
    overTheTop: overTheTopRows.reduce((r, i) => r + i, 0),
    underTheBottom: underTheBottomRows.reduce((r, i) => r + i, 0),
    keyOffset: overTheTopRows.length,
    overTheTopRows,
    underTheBottomRows,
  };
}
