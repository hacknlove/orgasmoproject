"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function Svg({ path, ...props }) {
    if (!Array.isArray(path)) {
        path = [path];
    }
    return ((0, jsx_runtime_1.jsx)("svg", { ...props, children: path.map(({ d, ...props }) => ((0, jsx_runtime_1.jsx)("path", { d: d, ...props }, d))) }));
}
exports.default = Svg;
//# sourceMappingURL=Svg.js.map