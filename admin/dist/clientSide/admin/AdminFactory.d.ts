/// <reference types="react" />
export default function AdminFactory({ DComponent, Components, Page }: {
    DComponent: any;
    Components: any;
    Page: any;
}): ({ pageConfigs, resolvedUrl, adminPageConfig, driverMethods, }: {
    pageConfigs: any;
    resolvedUrl: any;
    adminPageConfig: any;
    driverMethods: any;
}) => JSX.Element;
