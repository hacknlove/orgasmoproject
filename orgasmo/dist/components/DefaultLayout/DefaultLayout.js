"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Area_1 = require("../Area");
const react_1 = require("@orgasmo/dynamicstate/react");
function DefaultLayout({ cssVars }) {
    const [areas] = (0, react_1.useDynamicValue)("var://areasNames");
    if (!areas) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { style: cssVars, children: areas.map((name) => ((0, jsx_runtime_1.jsx)("div", { id: name, className: "_oa", children: (0, jsx_runtime_1.jsx)(Area_1.default, { name: name }) }, name))) }));
}
exports.default = DefaultLayout;
//# sourceMappingURL=DefaultLayout.js.map