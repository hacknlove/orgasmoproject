"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const PageUl_1 = require("./PageUl");
function PagesList_o({ pages }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { className: "MainLayout_nav_list_title_o", children: "Pages" }), Object.entries(pages).map(([path, stories]) => ((0, jsx_runtime_1.jsx)(PageUl_1.default, { path: path, stories: stories }, path)))] }));
}
exports.default = PagesList_o;
//# sourceMappingURL=PagesList_o.dynamic.js.map