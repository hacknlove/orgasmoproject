"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const useItems_1 = require("./useItems");
function Dynamic({ src, items: itemsProp, mode, threshold, DComponent, }) {
    const { items, ref, overTheTop, keyOffset, underTheBottom } = (0, useItems_1.default)({
        src,
        mode,
        threshold,
        items: itemsProp ?? [],
    });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: { height: overTheTop } }), (0, jsx_runtime_1.jsx)("div", { ref: ref, children: items.map((props, i) => props && ((0, jsx_runtime_1.jsx)(DComponent, { type: props.type, props: props.props }, i + keyOffset))) }), (0, jsx_runtime_1.jsx)("div", { style: { height: underTheBottom } })] }));
}
exports.default = Dynamic;
//# sourceMappingURL=Dynamic.js.map