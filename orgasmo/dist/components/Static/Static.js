"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const DComponent_1 = require("../DComponent");
function Static({ items, Components, }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: items &&
            items.map((props, i) => props && ((0, jsx_runtime_1.jsx)(DComponent_1.default, { type: props.type, props: props.props, Components: Components }, i))) }));
}
exports.default = Static;
//# sourceMappingURL=Static.js.map