"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AdminContext_1 = require("../AdminContext");
const react_1 = require("react");
function EditJSSnipplets() {
    const { updatePageConfig, pageConfig } = (0, react_1.useContext)(AdminContext_1.default);
    const ref = (0, react_1.useRef)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "_oadmin_dialog", children: [(0, jsx_runtime_1.jsx)("label", { children: "Edit JS snippets" }), (0, jsx_runtime_1.jsx)("textarea", { ref: ref, defaultValue: pageConfig?.layout?.jssnippets, cols: 80, rows: 20 }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => {
                            ref.current.value = pageConfig?.layout?.jssnippets || "";
                        }, children: "Reset" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => {
                            updatePageConfig({
                                ...pageConfig,
                                layout: {
                                    ...pageConfig.layout,
                                    jssnippets: ref.current.value,
                                },
                            });
                        }, children: "Save" })] })] }));
}
exports.default = EditJSSnipplets;
//# sourceMappingURL=EditJSSnippets.dynamic.js.map