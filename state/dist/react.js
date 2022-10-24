"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDynamicState = exports.useDynamicChange = exports.useDynamicResource = exports.useDynamicValue = exports.WithDynamicValue = exports.DynamicStateProvider = exports.clientSide = exports.ContextState = void 0;
const react_1 = require("react");
const index_js_1 = require("./index.js");
exports.ContextState = (0, react_1.createContext)({});
exports.clientSide = {};
function DynamicStateProvider({ children, plugins = [], initialState, testContextRef, }) {
    const value = (0, react_1.useMemo)(() => {
        const sharedState = new index_js_1.default({ plugins, initialState });
        exports.clientSide.sharedState = sharedState;
        if (testContextRef) {
            testContextRef.sharedState = sharedState;
            if (typeof window === "object") {
                window.dispatchEvent(new Event("sharedStateReady"));
            }
            if (typeof parent === "object") {
                parent.postMessage("sharedStateReady");
            }
        }
        return sharedState;
    }, []);
    (0, react_1.useEffect)(() => {
        if (!value) {
            return;
        }
        if (initialState) {
            Object.entries(initialState).forEach(([key, v]) => {
                value.setValue(key, v);
            });
        }
    }, [value, initialState]);
    return (0, react_1.createElement)(exports.ContextState.Provider, { value }, children);
}
exports.DynamicStateProvider = DynamicStateProvider;
function WithDynamicValue({ url, children }) {
    const [value, setValue, resource] = useDynamicValue(url, null);
    return children({
        value,
        setValue,
        resource,
    });
}
exports.WithDynamicValue = WithDynamicValue;
function useDynamicValue(resource, options) {
    resource = useDynamicResource(resource, options) ?? {
        value: null,
        url: null,
        setValue: (x) => set(x),
    };
    const [value, set] = (0, react_1.useState)(resource.value);
    (0, react_1.useEffect)(() => {
        set(resource.value);
    }, [resource]);
    useDynamicChange(resource.url, (value) => set(value), null);
    const setValue = (0, react_1.useCallback)((newValue) => resource.setValue(newValue), [resource]);
    const response = [value, setValue, resource];
    response.value = value;
    response.setValue = setValue;
    response.resource = resource;
    return response;
}
exports.useDynamicValue = useDynamicValue;
function useDynamicResource(url, options) {
    const sharedState = (0, react_1.useContext)(exports.ContextState);
    if (typeof url !== "string") {
        return url;
    }
    return sharedState.getResource(url, options);
}
exports.useDynamicResource = useDynamicResource;
function useDynamicChange(url, callback, options) {
    const sharedState = (0, react_1.useContext)(exports.ContextState);
    (0, react_1.useEffect)(() => url && sharedState.onChange(url, callback, options), [url, callback, options, sharedState]);
}
exports.useDynamicChange = useDynamicChange;
function useDynamicState() {
    return (0, react_1.useContext)(exports.ContextState);
}
exports.useDynamicState = useDynamicState;
//# sourceMappingURL=react.js.map