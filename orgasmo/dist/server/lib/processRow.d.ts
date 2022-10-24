export default function processRow({ rowConfig, params, ctx }: {
    rowConfig: any;
    params: any;
    ctx: any;
}): Promise<{
    type: any;
    props: any;
}>;
