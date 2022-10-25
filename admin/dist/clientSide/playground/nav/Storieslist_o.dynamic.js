"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const StoryUl_1 = require("./StoryUl");
function StoryLis_o({ stories }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { className: "MainLayout_nav_list_title_o", children: "Stories" }), Object.entries(stories).map(([component, stories]) => ((0, jsx_runtime_1.jsx)(StoryUl_1.default, { component: component, stories: stories }, component)))] }));
}
exports.default = StoryLis_o;
//# sourceMappingURL=Storieslist_o.dynamic.js.map