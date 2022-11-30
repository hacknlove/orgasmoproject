export default function getCachedPage(ctx: any): Promise<{
    key?: undefined;
    pageConfig?: undefined;
} | {
    key: any;
    pageConfig: any;
}>;
