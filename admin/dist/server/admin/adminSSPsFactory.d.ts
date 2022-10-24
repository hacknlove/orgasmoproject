export default function adminServerSidePropsFactory({ driver }: {
    driver: any;
}): (ctx: any) => Promise<{
    props: {
        to: any;
        pageConfigs?: undefined;
        adminPageConfig?: undefined;
        driverMethods?: undefined;
        resolvedUrl?: undefined;
    };
} | {
    props: {
        pageConfigs: {
            [k: string]: any;
        };
        adminPageConfig: any;
        driverMethods: string[];
        resolvedUrl: any;
        to?: undefined;
    };
}>;
