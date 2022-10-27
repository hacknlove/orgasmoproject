"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@orgasmo/dynamicstate/react");
const DeleteItem_1 = require("./DeleteItem");
const SelectLayoutMode_1 = require("./SelectLayoutMode");
const SelectPathSample_1 = require("./SelectPathSample");
function Title() {
    const [activeFilepath] = (0, react_1.useDynamicValue)("var://activeFilepath_o");
    return ((0, jsx_runtime_1.jsxs)("div", { id: "PlaygroundTitle_o", children: [(0, jsx_runtime_1.jsx)(SelectLayoutMode_1.default, {}), (0, jsx_runtime_1.jsx)("label", { children: activeFilepath || "Orgasmo's Playground" }), (0, jsx_runtime_1.jsx)("div", { style: { flexGrow: 1 } }), (0, jsx_runtime_1.jsx)(SelectPathSample_1.default, { filePath: activeFilepath }), (0, jsx_runtime_1.jsx)(DeleteItem_1.default, { filePath: activeFilepath })] }));
}
exports.default = Title;
//# sourceMappingURL=Title.js.map