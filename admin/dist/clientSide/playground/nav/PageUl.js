"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const router_1 = require("next/router");
const TeenyiconsFolderOutline_1 = require("../../icons/TeenyiconsFolderOutline");
const PageLi_1 = require("./PageLi");
const opened = {};
function PageList_o({ path, stories, }) {
    const router = (0, router_1.useRouter)();
    const keepOpened = (0, react_1.useCallback)((event) => {
        opened[path] = !event.currentTarget.open;
    }, [path]);
    return ((0, jsx_runtime_1.jsxs)("details", { className: "MainLayout_nav_li", open: router.query.path === path || opened[path], onClick: keepOpened, children: [(0, jsx_runtime_1.jsxs)("summary", { className: "MainLayout_nav_li_sumary", children: [(0, jsx_runtime_1.jsx)(TeenyiconsFolderOutline_1.default, { className: "MainLayout_nav_svg" }), " ", path] }), (0, jsx_runtime_1.jsx)("ul", { className: "MainLayout_nav_li_ul", children: Object.entries(stories).map(([pageId, description]) => ((0, jsx_runtime_1.jsx)(PageLi_1.default, { pageId: pageId, description: description }, pageId))) })] }));
}
exports.default = PageList_o;
//# sourceMappingURL=PageUl.js.map