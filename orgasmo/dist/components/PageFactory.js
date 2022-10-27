"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const DefaultLayout_1 = require("./DefaultLayout/DefaultLayout");
const Meta_1 = require("./Meta/Meta");
const react_2 = require("@orgasmo/dynamicstate/react");
const com_1 = require("@orgasmo/dynamicstate/plugins/com");
const DynamicStatePlugins = [com_1.default];
let exposeSharedState = process.env.NODE_ENV === "development";
function Layout() {
    const [layout] = (0, react_2.useDynamicValue)("var://layout");
    const [{ DComponent }] = (0, react_2.useDynamicValue)("var://DComponent");
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [layout?.meta && (0, jsx_runtime_1.jsx)(Meta_1.default, { meta: layout?.meta }), layout?.name ? ((0, jsx_runtime_1.jsx)(DComponent, { type: layout.name, props: {
                    cssVars: layout?.cssVars,
                } })) : ((0, jsx_runtime_1.jsx)(DefaultLayout_1.default, { cssVars: layout?.cssVars }))] }));
}
function PageFactory({ DComponent, }) {
    const Page = (props) => {
        const [clientSideOnly, setClientSideOnly] = (0, react_1.useState)(props.clientSideOnly);
        const [initialState, setInitialState] = (0, react_1.useState)(() => {
            const response = {
                "var://layout": props.layout,
                "var://areasNames": [],
                "var://DComponent": { DComponent },
            };
            for (const areaName in props.areas) {
                response["var://areasNames"].push(areaName);
                response[`var://area/${areaName}`] = props.areas[areaName];
            }
            return response;
        });
        const lastProps = (0, react_1.useRef)(props);
        exposeSharedState || (exposeSharedState = props.exposeSharedState);
        (0, react_1.useEffect)(() => {
            if (lastProps.current === props) {
                return;
            }
            const newInitialState = {
                "var://layout": props.layout,
                "var://areasNames": [],
            };
            for (const areaName in lastProps.current.areas) {
                newInitialState[`var://area/${areaName}`] = null;
            }
            for (const areaName in props.areas) {
                newInitialState["var://areasNames"].push(areaName);
                newInitialState[`var://area/${areaName}`] = props.areas[areaName];
            }
            lastProps.current = props;
            setInitialState(newInitialState);
        }, [props]);
        (0, react_1.useEffect)(() => {
            setClientSideOnly(false);
        }, [setClientSideOnly]);
        if (clientSideOnly) {
            return null;
        }
        return ((0, jsx_runtime_1.jsx)(react_2.DynamicStateProvider, { initialState: initialState, testContextRef: exposeSharedState && typeof window === "object" && window, plugins: DynamicStatePlugins, children: (0, jsx_runtime_1.jsx)(Layout, {}) }));
    };
    return Page;
}
exports.default = PageFactory;
//# sourceMappingURL=PageFactory.js.map