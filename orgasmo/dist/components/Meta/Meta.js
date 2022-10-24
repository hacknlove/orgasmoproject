"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const head_1 = require("next/head");
const react_1 = require("react");
function Meta({ meta }) {
    const title = (0, react_1.useMemo)(() => meta && meta.find(([name]) => name === "title")?.[1], [meta]);
    return (meta && ((0, jsx_runtime_1.jsxs)(head_1.default, { children: [title !== undefined && (0, jsx_runtime_1.jsx)("title", { children: title }), meta.map(([key, value]) => ((0, jsx_runtime_1.jsx)("meta", { name: key, content: value }, key)))] })));
}
exports.default = Meta;
//# sourceMappingURL=Meta.js.map