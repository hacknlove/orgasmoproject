"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteKVStorage_export_1 = require("./admin/deleteKVStorage.export");
const deletePageConfig_export_1 = require("./admin/deletePageConfig.export");
const deleteStoryConfig_export_1 = require("./admin/deleteStoryConfig.export");
const getAllKVStorages_export_1 = require("./admin/getAllKVStorages.export");
const getAllPages_export_1 = require("./admin/getAllPages.export");
const getAllStories_export_1 = require("./admin/getAllStories.export");
const getComponentStory_export_1 = require("./admin/getComponentStory.export");
const savePageConfig_export_1 = require("./admin/savePageConfig.export");
const saveStoryConfig_export_1 = require("./admin/saveStoryConfig.export");
const getValue_export_1 = require("./kvStorage/getValue.export");
const setValue_export_1 = require("./kvStorage/setValue.export");
const getPageConfig_export_1 = require("./page/getPageConfig.export");
const getPageConfigFromId_export_1 = require("./page/getPageConfigFromId.export");
const driver = {
    ["admin.deleteKVStorage"]: deleteKVStorage_export_1.default,
    ["admin.deletePageConfig"]: deletePageConfig_export_1.default,
    ["admin.deleteStoryConfig"]: deleteStoryConfig_export_1.default,
    ["admin.getAllKVStorages"]: getAllKVStorages_export_1.default,
    ["admin.getAllPages"]: getAllPages_export_1.default,
    ["admin.getAllStories"]: getAllStories_export_1.default,
    ["admin.getComponentStory"]: getComponentStory_export_1.default,
    ["admin.savePageConfig"]: savePageConfig_export_1.default,
    ["admin.saveStoryConfig"]: saveStoryConfig_export_1.default,
    ["kvStorage.getValue"]: getValue_export_1.default,
    ["kvStorage.setValue"]: setValue_export_1.default,
    ["page.getPageConfig"]: getPageConfig_export_1.default,
    ["page.getPageConfigFromId"]: getPageConfigFromId_export_1.default,
};
driver["admin"] = {};
driver["admin"]["deleteKVStorage"] = deleteKVStorage_export_1.default;
driver["admin"]["deletePageConfig"] = deletePageConfig_export_1.default;
driver["admin"]["deleteStoryConfig"] = deleteStoryConfig_export_1.default;
driver["admin"]["getAllKVStorages"] = getAllKVStorages_export_1.default;
driver["admin"]["getAllPages"] = getAllPages_export_1.default;
driver["admin"]["getAllStories"] = getAllStories_export_1.default;
driver["admin"]["getComponentStory"] = getComponentStory_export_1.default;
driver["admin"]["savePageConfig"] = savePageConfig_export_1.default;
driver["admin"]["saveStoryConfig"] = saveStoryConfig_export_1.default;
driver["kvStorage"] = {};
driver["kvStorage"]["getValue"] = getValue_export_1.default;
driver["kvStorage"]["setValue"] = setValue_export_1.default;
driver["page"] = {};
driver["page"]["getPageConfig"] = getPageConfig_export_1.default;
driver["page"]["getPageConfigFromId"] = getPageConfigFromId_export_1.default;
exports.default = driver;
//# sourceMappingURL=driver.js.map