/// <reference types="react" />
export default function useScroll({ onHideBottom, onHideTop, onShowBottom, onShowTop, threshold, wait, }: {
    onHideBottom: any;
    onHideTop: any;
    onShowBottom: any;
    onShowTop: any;
    threshold: any;
    wait: any;
}): import("react").MutableRefObject<HTMLDivElement | null>;
