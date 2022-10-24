export default function rewrite({ ctx, rewrite, key }: {
    ctx: any;
    rewrite: any;
    key: any;
}): Promise<any> | {
    notFound: boolean;
};
