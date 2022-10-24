"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AdminContext_1 = require("../AdminContext");
const react_1 = require("react");
const AdminDataLists_dynamic_1 = require("../AdminDataLists.dynamic");
function EditLayoutName() {
    const { updatePageConfig, pageConfig, Components } = (0, react_1.useContext)(AdminContext_1.default);
    const ref = (0, react_1.useRef)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "_oadmin_dialog", children: [(0, jsx_runtime_1.jsx)(AdminDataLists_dynamic_1.AdminComponentsDataList, { Components: Components }), (0, jsx_runtime_1.jsx)("label", { children: "Edit Layout Name" }), (0, jsx_runtime_1.jsx)("input", { ref: ref, type: "text", list: "_oadminComponents", defaultValue: pageConfig?.layout?.name }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => {
                            ref.current.value = pageConfig?.layout?.name || "";
                        }, children: "Reset" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => {
                            updatePageConfig({
                                ...pageConfig,
                                layout: {
                                    ...pageConfig.layout,
                                    name: ref.current.value,
                                },
                            });
                        }, children: "Save" })] })] }));
}
exports.default = EditLayoutName;
//# sourceMappingURL=EditLayoutName.dynamic.js.map