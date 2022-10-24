"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const PagesList_o_dynamicc_1 = require("./PagesList_o.dynamicc");
function PagesList_o({ pages }) {
    console.log({ pages });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Object.entries(pages).map(([path, stories]) => ((0, jsx_runtime_1.jsx)(PagesList_o_dynamicc_1.default, { path: path, stories: stories }, path))) }));
}
exports.default = PagesList_o;
//# sourceMappingURL=PageList_o.dynamicc.js.map