"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const RadixIconsComponent2_1 = require("../../icons/RadixIconsComponent2");
const StoryLi_1 = require("./StoryLi");
const opened = {};
function StoryUl({ component, stories }) {
    const keepOpened = (0, react_1.useCallback)((event) => {
        opened[component] = !event.currentTarget.open;
    }, [component]);
    return ((0, jsx_runtime_1.jsxs)("details", { className: "MainLayout_nav_li", open: opened[component], onClick: keepOpened, children: [(0, jsx_runtime_1.jsxs)("summary", { className: "MainLayout_nav_li_sumary", children: [(0, jsx_runtime_1.jsx)(RadixIconsComponent2_1.default, { className: "MainLayout_nav_svg" }), " ", component] }), (0, jsx_runtime_1.jsx)("ul", { className: "MainLayout_nav_li_ul", children: Object.entries(stories).map(([name, description]) => ((0, jsx_runtime_1.jsx)(StoryLi_1.default, { storyName: name, description: description, component: component }, name))) })] }));
}
exports.default = StoryUl;
//# sourceMappingURL=StoryUl.js.map