"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = require("next/link");
const react_1 = require("react");
const router_1 = require("next/router");
const TeenyiconsFolderOutline_1 = require("../../icons/TeenyiconsFolderOutline");
const IconoirEmptyPage_1 = require("../../icons/IconoirEmptyPage");
const react_2 = require("@orgasmo/dynamicstate/react");
const opened = {};
function Item({ path, pageId, description }) {
    const router = (0, router_1.useRouter)();
    const [isDirty] = (0, react_2.useDynamicValue)(`var://page/${path}/${pageId}/isDirty_o`);
    return ((0, jsx_runtime_1.jsx)("li", { className: `MainLayout_nav_li_ul_li ${router.query.path === path && router.query.pageId === pageId
            ? "MainLayout_nav_active_o"
            : ""}`, children: (0, jsx_runtime_1.jsx)(link_1.default, { href: `/playground?path=${path}&pageId=${pageId}`, children: (0, jsx_runtime_1.jsxs)("a", { className: "MainLayout_nav_li_ul_li_a", title: description, children: [" ", (0, jsx_runtime_1.jsx)(IconoirEmptyPage_1.default, { className: "MainLayout_nav_svg" }), pageId, " ", isDirty ? "*" : ""] }) }) }, pageId));
}
function PageListComponent({ path, stories, }) {
    const router = (0, router_1.useRouter)();
    const keepOpened = (0, react_1.useCallback)((event) => {
        opened[path] = !event.currentTarget.open;
    }, [path]);
    return ((0, jsx_runtime_1.jsxs)("details", { className: "MainLayout_nav_li", open: router.query.path === path || opened[path], onClick: keepOpened, children: [(0, jsx_runtime_1.jsxs)("summary", { className: "MainLayout_nav_li_sumary", children: [(0, jsx_runtime_1.jsx)(TeenyiconsFolderOutline_1.default, { className: "MainLayout_nav_svg" }), " ", path] }), (0, jsx_runtime_1.jsx)("ul", { className: "MainLayout_nav_li_ul", children: Object.entries(stories).map(([pageId, { description }]) => ((0, jsx_runtime_1.jsx)(Item, { path: path, pageId: pageId, description: description }, pageId))) })] }));
}
exports.default = PageListComponent;
//# sourceMappingURL=PageListComponent.dynamic.js.map