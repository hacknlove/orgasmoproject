/// <reference types="react" />
export default function useItems({ src: srcProps, items: itemsProp, mode, threshold, }: {
    src: any;
    items: any;
    mode: any;
    threshold?: number | undefined;
}): {
    items: any[];
    getItemConfig: () => Promise<void>;
    ref: import("react").MutableRefObject<HTMLDivElement | null>;
    overTheTop: number;
    underTheBottom: number;
    keyOffset: number;
    overTheTopItems: number[];
    underTheBottomItems: number[];
};
