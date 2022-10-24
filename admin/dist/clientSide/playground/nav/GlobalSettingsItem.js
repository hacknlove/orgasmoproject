"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = require("next/link");
const MaterialSymbolsSettingsRounded_1 = require("../../icons/MaterialSymbolsSettingsRounded");
const router_1 = require("next/router");
function GlobalSettingsItem() {
    const router = (0, router_1.useRouter)();
    const selected = !router.query.component && !router.query.path;
    return ((0, jsx_runtime_1.jsx)(link_1.default, { href: "/playground", children: (0, jsx_runtime_1.jsxs)("a", { id: "MainLayout_nav_home_o", className: selected ? "MainLayout_nav_active_o" : "", children: [(0, jsx_runtime_1.jsx)(MaterialSymbolsSettingsRounded_1.default, { className: "MainLayout_nav_svg" }), " ", (0, jsx_runtime_1.jsx)("span", { children: "Global settings" })] }) }));
}
exports.default = GlobalSettingsItem;
//# sourceMappingURL=GlobalSettingsItem.js.map