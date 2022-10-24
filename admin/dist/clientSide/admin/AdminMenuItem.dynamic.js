"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AsyncComponents_1 = require("@orgasmo/orgasmo/AsyncComponents");
const react_1 = require("react");
const AdminContext_1 = require("./AdminContext");
function AdminButton({ label, area, modal }) {
    const { chooseMenu, DComponent, Components } = (0, react_1.useContext)(AdminContext_1.default);
    return ((0, jsx_runtime_1.jsx)("div", { className: "_oadmin_menu_item", onClick: (event) => {
            event.stopPropagation();
            if (area) {
                chooseMenu(area);
            }
            if (Components[modal]) {
                (0, AsyncComponents_1.default)(DComponent, { type: modal, props: {} }, "playgroundModal_o");
            }
        }, children: label }));
}
exports.default = AdminButton;
//# sourceMappingURL=AdminMenuItem.dynamic.js.map