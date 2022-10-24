"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function Static({ items, DComponent, }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: items &&
            items.map((props, i) => props && ((0, jsx_runtime_1.jsx)(DComponent, { type: props.type, props: props.props }, i))) }));
}
exports.default = Static;
//# sourceMappingURL=Static.js.map