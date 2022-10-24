export default function expandLayout({ ctx, layoutConfig, params }: {
    ctx: any;
    layoutConfig: any;
    params: any;
}): Promise<{
    name: any;
    cssVars: {
        [k: string]: string;
    };
    meta: any;
} | undefined>;
