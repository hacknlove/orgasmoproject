export default function getServerSideProps(ctx: any): Promise<{
    props: {
        clientSideOnly: boolean;
        layout: {
            name: string;
            meta: string[][];
        };
        areas: Record<string, any>;
    };
} | {
    notFound: number;
    props: {
        exposeSharedState?: undefined;
        areas?: undefined;
    };
} | {
    props: {
        exposeSharedState: boolean;
        areas: {};
    };
    notFound?: undefined;
}>;
