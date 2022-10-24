export default function storySSPsFactory({ driver, Components, layout }: {
    driver: any;
    Components: any;
    layout: any;
}): (ctx: any) => Promise<{
    props: {
        clientSideOnly: boolean;
        layout: any;
        areas: Record<string, any>;
    };
} | {
    props: {
        exposeSharedState: boolean;
        areas: {};
    };
}>;
