import SharedState from "./index.js";
export declare const ContextState: import("react").Context<{}>;
export declare const clientSide: Record<string, any>;
interface StateProviderParams {
    children: any;
    plugins?: any[];
    initialState?: any;
    testContextRef?: any;
}
export declare function DynamicStateProvider({ children, plugins, initialState, testContextRef, }: StateProviderParams): import("react").FunctionComponentElement<import("react").ProviderProps<{}>>;
export declare function WithDynamicValue({ url, children }: {
    url: any;
    children: any;
}): any;
export declare function useDynamicValue(resource: any, options?: null | Record<string, any>): any;
export declare function useDynamicResource(url: string, options?: any): any;
export declare function useDynamicChange(url: any, callback: any, options?: any): void;
export declare function useDynamicState(): SharedState;
export {};
