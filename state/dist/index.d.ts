export default class SharedState {
    plugins: Map<any, any>;
    resources: Map<any, any>;
    proxy: ProxyConstructor;
    defaultError: any;
    constructor({ plugins, initialState }?: {
        plugins?: any;
        initialState?: {} | undefined;
    });
    findPlugin(url: any): any;
    getResource(url: any, options?: {}): any;
    getValue(url: any, options?: {}): any;
    setValue(url: any, value: any, options?: {}): void;
    deleteResource(url: any): void;
    onChange(url: any, callback: any, options: any): any;
    fetch(url: any, options: any): Promise<any>;
}
