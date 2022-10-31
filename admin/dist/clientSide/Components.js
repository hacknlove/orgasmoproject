"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamic_1 = require("next/dynamic");
exports.default = {
    Admin: (0, dynamic_1.default)(() => import("./admin/Admin.dynamic.js"), {
        suspense: true,
        loading: undefined,
    }),
    AdminDataLists: (0, dynamic_1.default)(() => import("./admin/AdminDataLists.dynamic.js"), {
        suspense: true,
        loading: undefined,
    }),
    ChoosePageId: (0, dynamic_1.default)(() => import("./admin/ChoosePageId.dynamic.js"), {
        suspense: true,
        loading: undefined,
    }),
    EditCookies: (0, dynamic_1.default)(() => import("./admin/page/EditCookies.dynamic.js"), {
        suspense: true,
        loading: undefined,
    }),
    EditCSSvars: (0, dynamic_1.default)(() => import("./admin/page/EditCSSvars.dynamic.js"), {
        suspense: true,
        loading: undefined,
    }),
    EditJSSnippets: (0, dynamic_1.default)(() => import("./admin/page/EditJSSnippets.dynamic.js"), {
        suspense: true,
        loading: undefined,
    }),
    EditLayoutName: (0, dynamic_1.default)(() => import("./admin/page/EditLayoutName.dynamic.js"), {
        suspense: true,
        loading: undefined,
    }),
    EditMetaTags: (0, dynamic_1.default)(() => import("./admin/page/EditMetaTags.dynamic.js"), {
        suspense: true,
        loading: undefined,
    }),
    EditPage: (0, dynamic_1.default)(() => import("./admin/page/EditPage.dynamic.js"), {
        suspense: true,
        loading: undefined,
    }),
    PlayGroundMainLayout_o: (0, dynamic_1.default)(() => import("./playground/MainLayout/PlayGroundMainLayout_o.dynamic.js"), {
        suspense: true,
        loading: undefined,
    }),
    KVStorageList_o: (0, dynamic_1.default)(() => import("./playground/nav/KVStorageList_o.dynamic.js"), {
        suspense: true,
        loading: undefined,
    }),
    PagesList_o: (0, dynamic_1.default)(() => import("./playground/nav/PagesList_o.dynamic.js"), {
        suspense: true,
        loading: undefined,
    }),
    Storieslist_o: (0, dynamic_1.default)(() => import("./playground/nav/Storieslist_o.dynamic.js"), {
        suspense: true,
        loading: undefined,
    }),
};
//# sourceMappingURL=Components.js.map