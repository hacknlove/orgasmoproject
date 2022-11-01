/// <reference types="react" />
export default function AdminFactory({ Components, Page }: {
    Components: any;
    Page: any;
}): ({ pageConfigs, resolvedUrl, adminPageConfig, driverMethods, }: {
    pageConfigs: any;
    resolvedUrl: any;
    adminPageConfig: any;
    driverMethods: any;
}) => JSX.Element;
