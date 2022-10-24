"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@orgasmo/dynamicstate/react");
const RadixIconsBookmark_1 = require("../../icons/RadixIconsBookmark");
function StoryLi({ storyName, description, component }) {
    const filePath = `/component/${component}/${storyName}`;
    const [activeFilepath, setActiveFilepath] = (0, react_1.useDynamicValue)("var://activeFilepath_o");
    const selected = activeFilepath == filePath;
    const [isDirty] = (0, react_1.useDynamicValue)(`com://file${filePath}?isDirty`, {
        computation(state) {
            return (state[`var://file${filePath}?content`] !==
                state[`var://file${filePath}?original`]);
        },
        urls: [`var://file${filePath}?content`, `var://file${filePath}?original`],
    });
    return ((0, jsx_runtime_1.jsx)("li", { className: `MainLayout_nav_li_ul_li ${selected ? "MainLayout_nav_active_o" : ""}`, onClick: () => setActiveFilepath(filePath), children: (0, jsx_runtime_1.jsxs)("a", { className: "MainLayout_nav_li_ul_li_a", title: description, children: [(0, jsx_runtime_1.jsx)(RadixIconsBookmark_1.default, { className: "MainLayout_nav_svg" }), " ", storyName, " ", isDirty ? "*" : ""] }) }));
}
exports.default = StoryLi;
//# sourceMappingURL=StoryLi.js.map