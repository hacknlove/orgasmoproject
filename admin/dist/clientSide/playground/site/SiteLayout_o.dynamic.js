"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Editor_1 = require("../Editor/Editor");
const Render_1 = require("../Render/Render");
const Title_1 = require("../Title/Title");
function SiteLayout() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Title_1.default, {}), (0, jsx_runtime_1.jsx)(Render_1.default, {}), (0, jsx_runtime_1.jsx)(Editor_1.default, {})] }));
}
exports.default = SiteLayout;
//# sourceMappingURL=SiteLayout_o.dynamic.js.map