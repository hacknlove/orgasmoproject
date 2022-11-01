"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function expandJSX(content, Components) {
    if (typeof content === "string") {
        return content;
    }
    if (!Array.isArray(content)) {
        return expandJSX([content], Components);
    }
    if (!content) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: content.map((item, i) => {
            if (item == null) {
                return null;
            }
            if (typeof item === "string") {
                return item;
            }
            return (0, jsx_runtime_1.jsx)(DComponent, { ...item, Components: Components }, i);
        }) }));
}
function expandCreate(content, Components) {
    if (typeof content === "string") {
        return [content];
    }
    if (!Array.isArray(content)) {
        return expandCreate([content], Components);
    }
    return content.map((item, i) => {
        if (item == null) {
            return null;
        }
        if (typeof item === "string") {
            return item;
        }
        return (0, react_1.createElement)(DComponent, { ...item, Components });
    });
}
function DComponent({ type, props, Components }) {
    if (!type) {
        console.error("Mising type");
        return null;
    }
    const Component = Components[type];
    if (Component) {
        if (props?.content) {
            const { content, ...newProps } = props;
            return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: null, children: (0, jsx_runtime_1.jsx)(Component, { ...newProps, children: expandJSX(content, Components) }) }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: null, children: (0, jsx_runtime_1.jsx)(Component, { ...props }) }));
        }
    }
    if (type.match(/^[a-z]/)) {
        if (props?.content) {
            const { content, ...newProps } = props;
            const children = expandCreate(content, Components);
            return (0, react_1.createElement)(type, newProps, ...children);
        }
        else {
            return (0, react_1.createElement)(type, props);
        }
    }
    return (0, jsx_runtime_1.jsx)("div", { "data-component-name": type });
}
exports.default = DComponent;
//# sourceMappingURL=DComponent.js.map