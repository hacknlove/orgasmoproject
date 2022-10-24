export default function upsertStoryConfig(ctx: any, { component, story, ...$set }: {
    [x: string]: any;
    component: any;
    story: any;
}): Promise<{
    ok: boolean;
}>;
