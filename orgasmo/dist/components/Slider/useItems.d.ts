export default function useItems({ items: itemsProp, src: srcProps }: {
    items: any;
    src: any;
}): {
    items: any;
    loading: boolean;
    hasMore: boolean;
    getMoreItems: (n: any) => Promise<void>;
};
