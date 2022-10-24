/// <reference types="react" />
import type { DComponent } from "../types";
declare type AreaContext = {
    DComponent: DComponent;
    areas: Record<string, any>;
    layout: Record<string, any>;
    setLayout: {
        (layout: Record<string, any>): void;
    };
    setAreas: {
        (areas: Record<string, any>): void;
    };
};
declare const _default: import("react").Context<AreaContext>;
export default _default;
