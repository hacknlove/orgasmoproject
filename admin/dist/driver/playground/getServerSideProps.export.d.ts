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
    props: {
        exposeSharedState: boolean;
        areas: {};
    };
}>;
