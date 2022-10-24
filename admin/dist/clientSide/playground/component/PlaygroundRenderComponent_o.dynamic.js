"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const router_1 = require("next/router");
const react_1 = require("react");
const equal = require("fast-deep-equal");
const react_2 = require("@orgasmo/dynamicstate/react");
function PlaygroundRenderComponent_o({ itemConfig }) {
    const router = (0, router_1.useRouter)();
    const [{ DComponent }] = (0, react_2.useDynamicValue)("var://DComponent");
    return ((0, jsx_runtime_1.jsx)(ErrorBoundary, { children: (0, jsx_runtime_1.jsx)(DComponent, { type: router.query.component, props: itemConfig.props }) }));
}
exports.default = PlaygroundRenderComponent_o;
class ErrorBoundary extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasError: false,
        };
    }
    static getDerivedStateFromError(error) {
        return { hasError: error };
    }
    componentDidUpdate(prevProps) {
        if (!equal(this.props, prevProps)) {
            this.setState({ hasError: false });
        }
    }
    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (0, jsx_runtime_1.jsx)("h1", { children: "The Component properties are not valid" });
        }
        return this.props.children;
    }
}
//# sourceMappingURL=PlaygroundRenderComponent_o.dynamic.js.map