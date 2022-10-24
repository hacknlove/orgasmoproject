export default function deleteStoryConfig(ctx: any, { component, story }: {
    component: any;
    story: any;
}): Promise<{
    ok: boolean;
}>;
