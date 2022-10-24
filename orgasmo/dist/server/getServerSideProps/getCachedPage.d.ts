export default function getCachedPage(ctx: any): Promise<{
    key: any;
    pageConfig: any;
} | {
    key?: undefined;
    pageConfig?: undefined;
}>;
