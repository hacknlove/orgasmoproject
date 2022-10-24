"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@orgasmo/dynamicstate/react");
const Tab_1 = require("./Tab");
const react_2 = require("react");
function FullPath() {
    const [activeFilepath] = (0, react_1.useDynamicValue)("var://activeFilepath_o");
    if (!activeFilepath) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "monaco-editor", style: {
            width: "100%",
            background: "#1e1e1e",
            color: "#ddd",
            padding: "0.5rem 1rem",
            fontSize: "90%",
        }, children: activeFilepath.substr(1).replace(/\//g, " › ") }));
}
function Tabs() {
    const [tabs, setTabs] = (0, react_1.useDynamicValue)("var://tabs_o");
    const dynamicstate = (0, react_1.useDynamicState)();
    (0, react_1.useDynamicChange)("var://activeFilepath_o", (activeFilename) => {
        if (!activeFilename) {
            return;
        }
        if (!tabs) {
            setTabs([activeFilename]);
            return;
        }
        if (!tabs.includes(activeFilename)) {
            setTabs([...tabs, activeFilename]);
        }
    });
    (0, react_2.useEffect)(() => {
        function onKeyDown(event) {
            if (!event.altKey && !event.ctrlKey) {
                return;
            }
            const activeFilePath = dynamicstate.getValue("var://activeFilepath_o");
            switch (event.key) {
                case "w": {
                    const tabs = dynamicstate.getValue("var://tabs_o");
                    dynamicstate.setValue("var://tabs_o", tabs.filter((path) => path !== activeFilePath));
                    dynamicstate.setValue("var://activeFilepath_o", tabs[0]);
                }
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "tabs_o", children: [tabs?.map((filePath) => ((0, jsx_runtime_1.jsx)(Tab_1.default, { filePath: filePath }, filePath))), (0, jsx_runtime_1.jsx)("div", { style: { flexGrow: 1 } }), (0, jsx_runtime_1.jsx)(FullPath, {})] }) }));
}
exports.default = Tabs;
//# sourceMappingURL=Tabs.js.map