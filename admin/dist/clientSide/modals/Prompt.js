"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const EpCloseBold_1 = require("../icons/EpCloseBold");
function SaveAsInput({ resolve, defaultValue = "", label = "", title = "Save as...", pattern, ...more }) {
    pattern = pattern?.toString()?.replace?.(/^\/(.*)\/[igm]?$/, "$1");
    const ref = (0, react_1.useRef)();
    function onSubmit() {
        resolve(ref.current.value);
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "modal_o_wrapper", children: (0, jsx_runtime_1.jsxs)("form", { className: "modal_o", onSubmit: onSubmit, onClick: (event) => event.stopPropagation(), children: [(0, jsx_runtime_1.jsxs)("div", { className: "modal_o_title", children: [(0, jsx_runtime_1.jsx)("span", { children: title }), (0, jsx_runtime_1.jsx)(EpCloseBold_1.default, { className: "modal_o_close", onClick: () => {
                                resolve();
                            } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "modal_o_body", children: [(0, jsx_runtime_1.jsxs)("div", { className: "modal_o_fields", children: [(0, jsx_runtime_1.jsx)("label", { children: label }), (0, jsx_runtime_1.jsx)("input", { pattern: pattern, autoFocus: true, className: "input_o", ref: ref, defaultValue: defaultValue, ...more })] }), (0, jsx_runtime_1.jsxs)("div", { className: "modal_o_buttons", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "button_o", onClick: () => resolve(), children: "Cancel" }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "button_o", children: "Ok" })] })] })] }) }));
}
exports.default = SaveAsInput;
//# sourceMappingURL=Prompt.js.map