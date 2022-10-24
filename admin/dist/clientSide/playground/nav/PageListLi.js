"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@orgasmo/dynamicstate/react");
const IconoirEmptyPage_1 = require("../../icons/IconoirEmptyPage");
function PageLi({ pageId, description }) {
    const filePath = `/page/${pageId}`;
    const [activeFilepath, setActiveFilepath] = (0, react_1.useDynamicValue)("var://activeFilepath_o");
    const [isDirty] = (0, react_1.useDynamicValue)(`com://file${filePath}?isDirty`, {
        computation(state) {
            return (state[`var://file${filePath}?content`] !==
                state[`var://file${filePath}?original`]);
        },
        urls: [`var://file${filePath}?content`, `var://file${filePath}?original`],
    });
    const selected = activeFilepath == filePath;
    return ((0, jsx_runtime_1.jsx)("li", { className: `MainLayout_nav_li_ul_li ${selected ? "MainLayout_nav_active_o" : ""}`, onClick: () => setActiveFilepath(filePath), children: (0, jsx_runtime_1.jsxs)("a", { className: "MainLayout_nav_li_ul_li_a", title: description, children: [" ", (0, jsx_runtime_1.jsx)(IconoirEmptyPage_1.default, { className: "MainLayout_nav_svg" }), pageId, " ", isDirty ? "*" : ""] }) }));
}
exports.default = PageLi;
//# sourceMappingURL=PageListLi.js.map