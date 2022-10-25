"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const MaterialSymbolsSettingsRounded_1 = require("../../icons/MaterialSymbolsSettingsRounded");
const react_1 = require("@orgasmo/dynamicstate/react");
const filePath = "/site/config";
function GlobalSettingsItem() {
    const [activeFilepath, setActiveFilepath] = (0, react_1.useDynamicValue)("var://activeFilepath_o");
    const selected = activeFilepath == filePath;
    return ((0, jsx_runtime_1.jsx)("div", { onClick: () => setActiveFilepath(filePath), children: (0, jsx_runtime_1.jsxs)("a", { className: `nav_header_li ${selected ? "MainLayout_nav_active_o" : ""}`, children: [(0, jsx_runtime_1.jsx)(MaterialSymbolsSettingsRounded_1.default, { className: "MainLayout_nav_svg" }), " ", (0, jsx_runtime_1.jsx)("span", { children: "Global settings" })] }) }));
}
exports.default = GlobalSettingsItem;
//# sourceMappingURL=GlobalSettingsItem.js.map