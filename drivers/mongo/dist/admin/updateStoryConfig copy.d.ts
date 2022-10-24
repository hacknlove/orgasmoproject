export default function updateStoryConfig(ctx: any, { component, story, ...$set }: {
    [x: string]: any;
    component: any;
    story: any;
}): Promise<{
    ok: boolean;
}>;
