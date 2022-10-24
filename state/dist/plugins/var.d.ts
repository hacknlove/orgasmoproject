export declare class VarResource {
    url: string;
    cached: any;
    defaultValue: any;
    subscriptions: Map<any, any>;
    totalSubscriptionsCount: number;
    constructor(url: any, options?: Record<string, any>);
    setValue(value: any): void;
    getValue(): any;
    triggerSubscriptions(): void;
    get value(): any;
    set value(value: any);
    onChange(callback: any): () => boolean;
}
export default class VarPlugin {
    static protocol: string;
    newResource(url: any, options: any): VarResource;
}
