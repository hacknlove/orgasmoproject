"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@orgasmo/dynamicstate/react");
const Area_1 = require("@orgasmo/orgasmo/Area");
const AsyncComponents_1 = require("@orgasmo/orgasmo/AsyncComponents");
const Editor_1 = require("../Editor/Editor");
const Tabs_1 = require("../Editor/Tabs");
const NewFile_1 = require("../nav/NewFile");
const Render_1 = require("../Render/Render");
const Title_1 = require("../Title/Title");
const HorizontalSize_1 = require("./HorizontalSize");
const VerticalSize_1 = require("./VerticalSize");
function PlayGroundMainLayout_o() {
    const [layoutMode] = (0, react_1.useDynamicValue)("var://layoutMode", {
        defaultValue: "rows",
    });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(AsyncComponents_1.AsyncComponents, { area: "playgroundModal_o" }), (0, jsx_runtime_1.jsxs)("div", { id: "MainLayout_o", children: [(0, jsx_runtime_1.jsxs)("nav", { id: "MainLayout_nav_o", children: [(0, jsx_runtime_1.jsx)(NewFile_1.default, {}), (0, jsx_runtime_1.jsx)(Area_1.default, { name: "MainLayout_nav_o" })] }), (0, jsx_runtime_1.jsx)(HorizontalSize_1.default, {}), (0, jsx_runtime_1.jsx)(Title_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { id: `MainLayout_mode_${layoutMode}_o`, children: [(0, jsx_runtime_1.jsx)(Render_1.default, {}), (0, jsx_runtime_1.jsx)(VerticalSize_1.default, { mode: layoutMode, target: "PlaygroundRender_o" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", flexGrow: 1 }, children: [(0, jsx_runtime_1.jsx)(Tabs_1.default, {}), (0, jsx_runtime_1.jsx)(Editor_1.default, {})] })] })] })] }));
}
exports.default = PlayGroundMainLayout_o;
//# sourceMappingURL=PlayGroundMainLayout_o.dynamic.js.map