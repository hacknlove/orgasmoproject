/// <reference types="react" />
export declare function AdminComponentsDataList({ Components, filter, id, }: {
    Components: any;
    filter?: undefined;
    id?: string | undefined;
}): JSX.Element;
export declare function AdminDriversDataList({ driverMethods, filter, id, }: {
    driverMethods: any;
    filter?: undefined;
    id?: string | undefined;
}): JSX.Element;
interface AdminCSSVarsDataListParams {
    filter?: (any: any) => boolean;
    id?: string;
}
export declare function AdminCSSVarsDataList({ filter, id, }: AdminCSSVarsDataListParams): JSX.Element;
interface AdminDataListParams {
    list: string[];
    filter?: (any: any) => boolean;
    id?: string;
}
export default function AdminDataList({ list, filter, id, }: AdminDataListParams): JSX.Element;
export {};
