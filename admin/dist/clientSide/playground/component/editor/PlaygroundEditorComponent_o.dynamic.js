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
const useEditItemConfig_1 = require("./useEditItemConfig");
const useEditDescription_1 = require("./useEditDescription");
const useSave_1 = require("./useSave");
function IsDirtyButtons({ save, file }) {
    if (!file.edit.isDirty) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "\u00F8TabButtons", children: [(0, jsx_runtime_1.jsx)(CarbonReset_1.default, { onClick: file.reset }), (0, jsx_runtime_1.jsx)(CodiconSave_1.default, { onClick: () => save(file) })] }));
}
function PlaygroundEditorComponent_o({ description, itemConfig, }) {
    const router = (0, router_1.useRouter)();
    const monaco = (0, react_3.useMonaco)();
    const isDirty = (0, react_2.useDynamicResource)(`var://${router.query.component}/${router.query.story}/isDirty_o`);
    const files = (0, react_1.useRef)({
        itemConfig: {
            monaco: {
                defaultLanguage: "JSON",
                path: "itemConfig",
            },
            field: "itemConfig",
            label: "Config",
            reset: () => {
                const jsonstring = JSON.stringify(itemConfig, null, 2);
                monaco?.editor
                    ?.getModel?.("file:///itemConfig")
                    ?.setValue(jsonstring);
                editItemConfig.setValue(jsonstring);
            },
        },
        description: {
            monaco: {
                defaultLanguage: "Markdown",
                path: "descriptionFile",
            },
            field: "description",
            label: "Description",
            reset: () => {
                monaco?.editor
                    ?.getModel?.("file:///descriptionFile")
                    ?.setValue(description);
                editDescription.setValue(description);
            },
        },
    });
    const editItemConfig = (0, useEditItemConfig_1.default)(itemConfig, files.current.itemConfig);
    const editDescription = (0, useEditDescription_1.default)(description, files.current.description);
    (0, useUpdateComponent_1.default)(editItemConfig.value);
    const save = (0, useSave_1.default)({ files, description, itemConfig });
    const [file, setFile] = (0, react_1.useState)("itemConfig");
    (0, react_1.useEffect)(() => {
        window.monaco = monaco;
        isDirty.setValue(editItemConfig.isDirty || editDescription.isDirty);
    }, [editDescription.isDirty, editItemConfig.isDirty]);
    (0, react_1.useEffect)(() => {
        const jsonstring = JSON.stringify(itemConfig, null, 2);
        editDescription.setValue(description);
        editItemConfig.setValue(jsonstring);
        monaco?.editor
            ?.getModel?.("file:///itemConfig")
            ?.setValue(jsonstring);
        monaco?.editor
            ?.getModel?.("file:///descriptionFile")
            ?.setValue(description);
    }, [description, itemConfig]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "tabs_o", children: [(0, jsx_runtime_1.jsxs)("button", { className: `tab_o ${file === "description" ? "active_o" : ""}`, onClick: () => setFile("description"), children: ["Description", (0, jsx_runtime_1.jsx)(IsDirtyButtons, { save: save, file: files.current.description })] }), (0, jsx_runtime_1.jsxs)("button", { className: `tab_o ${file === "itemConfig" ? "active_o" : ""}`, onClick: () => setFile("itemConfig"), children: ["Config", (0, jsx_runtime_1.jsx)(IsDirtyButtons, { save: save, file: files.current.itemConfig })] }), (0, jsx_runtime_1.jsx)("div", { style: { flexGrow: 1 } })] }), (0, jsx_runtime_1.jsx)("div", { id: "StoryPlaygroundEditor_o", children: (0, jsx_runtime_1.jsx)(react_3.default, { theme: "vs-dark", className: " overflow-hidden", ...files.current[file].monaco, options: {
                        padding: {
                            bottom: 0,
                        },
                        scrollBeyondLastLine: false,
                        minimap: {
                            enabled: false,
                        },
                    } }) })] }));
}
exports.default = PlaygroundEditorComponent_o;
//# sourceMappingURL=PlaygroundEditorComponent_o.dynamic.js.map