"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const router_1 = require("next/router");
const react_1 = require("react");
const react_2 = require("@orgasmo/dynamicstate/react");
const react_3 = require("@monaco-editor/react");
const CarbonReset_1 = require("../../../icons/CarbonReset");
const CodiconSave_1 = require("../../../icons/CodiconSave");
const useUpdateComponent_1 = require("./useUpdateComponent");
const useEditPageConfig_1 = require("./useEditPageConfig");
const useSave_1 = require("./useSave");
function IsDirtyButtons({ save, file }) {
    if (!file.edit.isDirty) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "\u00F8TabButtons", children: [(0, jsx_runtime_1.jsx)(CarbonReset_1.default, { onClick: file.reset }), (0, jsx_runtime_1.jsx)(CodiconSave_1.default, { onClick: () => save(file) })] }));
}
function PagePlayground_o({ pageConfig }) {
    const router = (0, router_1.useRouter)();
    const monaco = (0, react_3.useMonaco)();
    const isDirty = (0, react_2.useDynamicResource)(`var://page/${router.query.path}/${router.query.pageId}/isDirty_o`);
    const files = (0, react_1.useRef)({
        pageConfig: {
            monaco: {
                defaultLanguage: "JSON",
                path: "pageConfig",
            },
            field: "pageConfig",
            label: "Config",
            reset: () => {
                const jsonstring = JSON.stringify(pageConfig, null, 2);
                monaco?.editor
                    ?.getModel?.("file:///pageConfig")
                    ?.setValue(jsonstring);
                editPageConfig.setValue(jsonstring);
            },
        },
    });
    const editPageConfig = (0, useEditPageConfig_1.default)(pageConfig, files.current.pageConfig);
    (0, useUpdateComponent_1.default)(editPageConfig.value);
    const save = (0, useSave_1.default)({ files, editPageConfig });
    const [file, setFile] = (0, react_1.useState)("pageConfig");
    (0, react_1.useEffect)(() => {
        window.monaco = monaco;
        isDirty.setValue(editPageConfig.isDirty);
    }, [editPageConfig.isDirty]);
    (0, react_1.useEffect)(() => {
        const jsonstring = JSON.stringify(pageConfig, null, 2);
        editPageConfig.setValue(jsonstring);
        monaco?.editor
            ?.getModel?.("file:///pageConfig")
            ?.setValue(jsonstring);
    }, [pageConfig]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "tabs_o", children: [(0, jsx_runtime_1.jsxs)("button", { className: `tab_o ${file === "pageConfig" ? "active_o" : ""}`, onClick: () => setFile("pageConfig"), children: ["Config", (0, jsx_runtime_1.jsx)(IsDirtyButtons, { save: save, file: files.current.pageConfig })] }), (0, jsx_runtime_1.jsx)("div", { style: { flexGrow: 1 } })] }), (0, jsx_runtime_1.jsx)("div", { id: "StoryPlaygroundEditor_o", children: (0, jsx_runtime_1.jsx)(react_3.default, { theme: "vs-dark", className: " overflow-hidden", ...files.current[file].monaco, options: {
                        padding: {
                            bottom: 0,
                        },
                        scrollBeyondLastLine: false,
                        minimap: {
                            enabled: false,
                        },
                    } }) })] }));
}
exports.default = PagePlayground_o;
//# sourceMappingURL=PagePlayground_o.dynamic.js.map