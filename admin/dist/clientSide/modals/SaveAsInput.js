"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const EpCloseBold_1 = require("../icons/EpCloseBold");
function SaveAsInput({ resolve, defaultValue = "", label = "", title = "Save as...", }) {
    const [value, setValue] = (0, react_1.useState)(defaultValue);
    return ((0, jsx_runtime_1.jsx)("div", { className: "modal_o_wrapper", onClick: (event) => {
            event.stopPropagation();
            if (event.target.className === "modal_o_wrapper") {
                resolve();
            }
        }, children: (0, jsx_runtime_1.jsxs)("div", { className: "modal_o", children: [(0, jsx_runtime_1.jsxs)("div", { className: "modal_o_title", children: [(0, jsx_runtime_1.jsx)("span", { children: title }), (0, jsx_runtime_1.jsx)(EpCloseBold_1.default, { className: "modal_o_close", onClick: () => resolve() })] }), (0, jsx_runtime_1.jsxs)("div", { className: "modal_o_body", children: [(0, jsx_runtime_1.jsxs)("div", { className: "modal_o_fields", children: [(0, jsx_runtime_1.jsx)("label", { children: label }), (0, jsx_runtime_1.jsx)("input", { autoFocus: true, className: "input_o", value: value, onChange: (event) => setValue(event.target.value) })] }), value && ((0, jsx_runtime_1.jsxs)("div", { className: "modal_o_buttons", children: [(0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => resolve(), children: "Cancel" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => resolve(value), children: "Save" })] }))] })] }) }));
}
exports.default = SaveAsInput;
//# sourceMappingURL=SaveAsInput.js.map