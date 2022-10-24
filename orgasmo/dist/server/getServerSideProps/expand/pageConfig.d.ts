interface expandPageConfigParameters {
    ctx: any;
    pageConfig: any;
    key: string;
    params?: any;
}
export default function expandPageConfig({ ctx, pageConfig, key, params, }: expandPageConfigParameters): Promise<any>;
export {};
