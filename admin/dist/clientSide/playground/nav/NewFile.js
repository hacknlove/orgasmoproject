"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@orgasmo/dynamicstate/react");
const MaterialSymbolsAdd_1 = require("../../icons/MaterialSymbolsAdd");
let filecount = 1;
function GlobalSettingsItem() {
    const [activeFilepath, setActiveFilepath] = (0, react_1.useDynamicValue)("var://activeFilepath_o");
    const selected = activeFilepath?.startsWith?.("/new");
    return ((0, jsx_runtime_1.jsx)("div", { onClick: () => setActiveFilepath(`/new/new-file-${filecount++}`), children: (0, jsx_runtime_1.jsxs)("a", { className: `nav_header_li ${selected ? "MainLayout_nav_active_o" : ""}`, children: [(0, jsx_runtime_1.jsx)(MaterialSymbolsAdd_1.default, { className: "MainLayout_nav_svg" }), " ", (0, jsx_runtime_1.jsx)("span", { children: "New File" })] }) }));
}
exports.default = GlobalSettingsItem;
//# sourceMappingURL=NewFile.js.map