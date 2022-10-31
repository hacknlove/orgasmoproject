"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const KVStorageLi_1 = require("./KVStorageLi");
function StoryList_o({ KVStorages }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { className: "MainLayout_nav_list_title_o", children: "Storage" }), (0, jsx_runtime_1.jsx)("ul", { className: "MainLayout_nav_li_ul", children: Object.entries(KVStorages).map(([key, description]) => ((0, jsx_runtime_1.jsx)(KVStorageLi_1.default, { label: key, description: description }, key))) })] }));
}
exports.default = StoryList_o;
//# sourceMappingURL=KVStorageList_o.dynamic.js.map