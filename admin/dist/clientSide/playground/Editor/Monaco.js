"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@monaco-editor/react");
const useFile_1 = require("./useFile");
const react_2 = require("react");
const react_3 = require("@orgasmo/dynamicstate/react");
function Monaco() {
    (0, useFile_1.default)();
    const [filePath] = (0, react_3.useDynamicValue)("var://activeFilepath_o");
    const [fileContent, setFileContent] = (0, react_3.useDynamicValue)(`var://file${filePath}?content`);
    const monaco = (0, react_1.useMonaco)();
    function onChange(value) {
        try {
            JSON.parse(value);
            setFileContent(value || "");
        }
        catch {
        }
    }
    (0, react_2.useEffect)(() => {
        if (!filePath) {
            monaco?.editor?.getModels?.()?.[0]?.setValue?.("");
        }
    }, [filePath, monaco?.editor]);
    (0, react_2.useEffect)(() => {
        if (fileContent === undefined) {
            return;
        }
        const model = monaco?.editor?.getModels?.()?.[0];
        if (model?.getValue() === fileContent) {
            return;
        }
        monaco?.editor?.getModels?.()?.[0]?.setValue?.(fileContent);
    }, [fileContent, monaco?.editor]);
    if (!filePath) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { id: "monaco-wrapper_o", children: (0, jsx_runtime_1.jsx)(react_1.default, { theme: "vs-dark", options: {
                padding: {
                    bottom: 50,
                },
                scrollBeyondLastLine: false,
                minimap: {
                    enabled: false,
                },
            }, defaultLanguage: "json", onChange: onChange }) }));
}
exports.default = Monaco;
//# sourceMappingURL=Monaco.js.map