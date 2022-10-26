export default function storySSPsFactory({ driver, Components }: {
    driver: any;
    Components: any;
}): (ctx: any) => Promise<{
    props: {
        clientSideOnly: boolean;
        layout: {
            name: string;
            meta: string[][];
        };
        areas: Record<string, any>;
    };
} | {
    notFound: boolean;
    props?: undefined;
} | {
    props: {
        exposeSharedState: boolean;
        areas: {};
    };
    notFound?: undefined;
}>;
