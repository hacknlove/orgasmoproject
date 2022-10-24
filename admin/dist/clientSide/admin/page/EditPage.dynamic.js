"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AdminContext_1 = require("../AdminContext");
const react_1 = require("react");
function fieldIsDirty({ pageConfig, editValues, field }) {
    return editValues[field] !== pageConfig[field] && "*";
}
function EditValue({ pageConfig, editValues, onChange, field, label, ...props }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("label", { children: [label, " ", fieldIsDirty({ pageConfig, editValues, field })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", "data-field": field, value: editValues[field] || "", onChange: onChange, ...props })] }));
}
function EditValueTextArea({ pageConfig, editValues, onChange, field, label }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("label", { children: [label, " ", fieldIsDirty({ pageConfig, editValues, field })] }), (0, jsx_runtime_1.jsx)("textarea", { "data-field": field, value: editValues[field] || "", onChange: onChange, cols: 80, rows: 20 })] }));
}
function EditPage() {
    const { updatePageConfig, pageConfig } = (0, react_1.useContext)(AdminContext_1.default);
    const getEditValues = (0, react_1.useCallback)(() => ({
        exactPath: pageConfig.exactPath,
        patternPath: pageConfig.patternPath,
        notes: pageConfig.notes,
        ratio: pageConfig.ratio,
    }), [pageConfig]);
    const [editValues, setEditValues] = (0, react_1.useState)(getEditValues);
    const reset = (0, react_1.useCallback)(() => {
        setEditValues(getEditValues);
    }, [getEditValues, setEditValues]);
    (0, react_1.useEffect)(reset, [reset]);
    const editValue = (0, react_1.useCallback)((event) => {
        const field = event.target.dataset.field;
        const newValues = {
            ...editValues,
            [field]: event.target.value || (pageConfig[field] === "" ? "" : undefined),
        };
        switch (field) {
            case "exactPath":
                newValues.patternPath = newValues.exactPath
                    ? undefined
                    : pageConfig.patternPath;
                break;
            case "patternPath":
                newValues.exactPath = newValues.patternPath
                    ? undefined
                    : pageConfig.exactPath;
                break;
            default:
                break;
        }
        setEditValues(newValues);
    }, [editValues, setEditValues]);
    const isDirty = (0, react_1.useMemo)(() => Object.entries(editValues).find(([key, value]) => value !== pageConfig[key]), [editValues]);
    const apply = (0, react_1.useCallback)(() => {
        for (const [key, value] of Object.entries(editValues)) {
            if (!value === undefined) {
                delete editValues[key];
            }
        }
        if (Object.prototype.hasOwnProperty.call(editValues, "ratio")) {
            editValues.ratio = parseFloat(editValues.ratio) || undefined;
        }
        updatePageConfig({
            ...pageConfig,
            ...editValues,
        });
    }, [updatePageConfig, editValues]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "_oadmin_dialog", children: [(0, jsx_runtime_1.jsx)(EditValue, { label: "Exact Path", field: "exactPath", editValues: editValues, onChange: editValue, pageConfig: pageConfig }), (0, jsx_runtime_1.jsx)(EditValue, { label: "Pattern Path", field: "patternPath", editValues: editValues, onChange: editValue, pageConfig: pageConfig }), (0, jsx_runtime_1.jsx)(EditValue, { label: "Ratio", field: "ratio", editValues: editValues, onChange: editValue, pageConfig: pageConfig, placeholder: "Number", type: "number" }), (0, jsx_runtime_1.jsx)(EditValueTextArea, { label: "Notes", field: "notes", editValues: editValues, onChange: editValue, pageConfig: pageConfig }), isDirty && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: reset, children: "Reset" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: apply, children: "Apply" })] }))] }));
}
exports.default = EditPage;
//# sourceMappingURL=EditPage.dynamic.js.map