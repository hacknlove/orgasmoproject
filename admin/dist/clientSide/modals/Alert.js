"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const EpCloseBold_1 = require("../icons/EpCloseBold");
function Alert({ title, text, resolve, name, message }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "modal_o_wrapper", onClick: (event) => {
            event.stopPropagation();
            if (event.target.className === "modal_o_wrapper") {
                resolve();
            }
        }, children: (0, jsx_runtime_1.jsxs)("div", { className: "modal_o", children: [(0, jsx_runtime_1.jsxs)("div", { className: "modal_o_title", children: [(0, jsx_runtime_1.jsx)("span", { children: title || name }), (0, jsx_runtime_1.jsx)(EpCloseBold_1.default, { className: "modal_o_close", onClick: () => resolve() })] }), (0, jsx_runtime_1.jsxs)("div", { className: "modal_o_body", children: [(0, jsx_runtime_1.jsx)("div", { children: text || message }), (0, jsx_runtime_1.jsx)("div", { className: "modal_o_buttons", children: (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => resolve(), children: "Ok" }) })] })] }) }));
}
exports.default = Alert;
//# sourceMappingURL=Alert.js.map