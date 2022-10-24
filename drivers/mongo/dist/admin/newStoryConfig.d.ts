export default function newStoryConfig(ctx: any, { _id, ...storyConfig }: {
    [x: string]: any;
    _id: any;
}): Promise<{
    ok: boolean;
}>;
