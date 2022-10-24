declare const plugin: {
    name: string;
    regex: RegExp;
    refresh(resource: any): any;
    getResource(resource: any): void;
    get(url: any): any;
    set(resource: any): boolean | undefined;
    start(): void;
};
export default plugin;
