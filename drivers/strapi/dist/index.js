"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updatePageConfig_1 = require("./admin/updatePageConfig");
const newPageConfig_1 = require("./admin/newPageConfig");
const getPageConfig_1 = require("./pages/getPageConfig");
const getPageConfigFromId_1 = require("./pages/getPageConfigFromId");
const filesystemDriver = {
    page: {
        getPageConfig: getPageConfig_1.default,
        getPageConfigFromId: getPageConfigFromId_1.default,
    },
    admin: {
        updatePageConfig: updatePageConfig_1.default,
        newPageConfig: newPageConfig_1.default,
    },
    "admin.updatePageConfig": updatePageConfig_1.default,
    "admin.newPageConfig": newPageConfig_1.default,
    "page.getPageConfig": getPageConfig_1.default,
    "page.getPageConfigFromId": getPageConfigFromId_1.default,
};
exports.default = filesystemDriver;
//# sourceMappingURL=index.js.map