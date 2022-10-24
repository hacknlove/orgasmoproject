import { VarResource } from "./var";
export declare class ApiResource extends VarResource {
    plugin: any;
    fetchOptions: any;
    debounce: any;
    interval: any;
    debounced: any;
    constructor(url: any, { endpoint, headers, debounce, interval, defaultError, skipFirst, ...options }: {
        [x: string]: any;
        endpoint: any;
        headers: any;
        debounce?: number | undefined;
        interval: any;
        defaultError: any;
        skipFirst: any;
    }, plugin: any);
    set endpoint(url: any);
    set headers(headers: any);
    refresh(debounce?: any): Promise<void>;
}
export default class ApiPlugin {
    static protocol: string;
    sharedContext: any;
    defaultError: any;
    constructor(sharedContext: any);
    newResource(url: any, options: any): ApiResource;
    GET(url: any, options: any): Promise<any>;
}
