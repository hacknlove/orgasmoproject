import { VarResource } from "./var";
export declare class ComResource extends VarResource {
    sharedContext: any;
    crossSubcriptions: any[];
    urls: never[];
    computation: any;
    constructor(url: any, { computation, urls, ...options }: {
        computation?: (() => undefined) | undefined;
        urls?: never[] | undefined;
    } | undefined, sharedContext: any);
    addUrls(urls: any): void;
    addComputation(computation: any): void;
    recompute(value: any, resource: any): any;
    removeComputation(): void;
}
export default class ComPlugin {
    static protocol: string;
    sharedContext: any;
    constructor(sharedContext: any);
    newResource(url: any, options: any): ComResource;
}
