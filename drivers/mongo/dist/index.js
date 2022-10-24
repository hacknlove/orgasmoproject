"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updatePageConfig_1 = require("./admin/updatePageConfig");
const upsertPageConfig_1 = require("./admin/upsertPageConfig");
const newPageConfig_1 = require("./admin/newPageConfig");
const getPageConfig_export_1 = require("./page/getPageConfig.export");
const getPageConfigFromId_1 = require("./page/getPageConfigFromId");
const getAllStories_1 = require("./admin/getAllStories");
const upsertStoryConfig_1 = require("./admin/upsertStoryConfig");
const deletePageConfig_1 = require("./admin/deletePageConfig");
const deleteStoryConfig_1 = require("./admin/deleteStoryConfig");
const getAllPages_1 = require("./admin/getAllPages");
const mongoDriver = {
    page: {
        getPageConfig: getPageConfig_export_1.default,
        getPageConfigFromId: getPageConfigFromId_1.default,
    },
    admin: {
        updatePageConfig: updatePageConfig_1.default,
        upsertPageConfig: upsertPageConfig_1.default,
        newPageConfig: newPageConfig_1.default,
        upsertStoryConfig: upsertStoryConfig_1.default,
        getAllStories: getAllStories_1.default,
        deletePageConfig: deletePageConfig_1.default,
        deleteStoryConfig: deleteStoryConfig_1.default,
        getAllPages: getAllPages_1.default,
    },
    "admin.updatePageConfig": updatePageConfig_1.default,
    "admin.upsertPageConfig": upsertPageConfig_1.default,
    "admin.newPageConfig": newPageConfig_1.default,
    "admin.upsertStoryConfig": upsertStoryConfig_1.default,
    "admin.getAllStories": getAllStories_1.default,
    "admin.deletePageConfig": deletePageConfig_1.default,
    "admin.deleteStoryConfig": deleteStoryConfig_1.default,
    "admin.getAllages": getAllPages_1.default,
    "page.getPageConfig": getPageConfig_export_1.default,
    "page.getPageConfigFromId": getPageConfigFromId_1.default,
};
exports.default = mongoDriver;
//# sourceMappingURL=index.js.map