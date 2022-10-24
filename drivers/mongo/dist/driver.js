"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deletePageConfig_export_1 = require("./admin/deletePageConfig.export");
const deleteSiteConfig_export_1 = require("./admin/deleteSiteConfig.export");
const deleteStoryConfig_export_1 = require("./admin/deleteStoryConfig.export");
const getAllPages_export_1 = require("./admin/getAllPages.export");
const getAllStories_export_1 = require("./admin/getAllStories.export");
const getComponentStory_export_1 = require("./admin/getComponentStory.export");
const savePageConfig_export_1 = require("./admin/savePageConfig.export");
const saveSiteConfig_export_1 = require("./admin/saveSiteConfig.export");
const saveStoryConfig_export_1 = require("./admin/saveStoryConfig.export");
const getPageConfig_export_1 = require("./page/getPageConfig.export");
const getPageConfigFromId_export_1 = require("./page/getPageConfigFromId.export");
const getConfig_export_1 = require("./site/getConfig.export");
const driver = {
    ["admin.deletePageConfig"]: deletePageConfig_export_1.default,
    ["admin.deleteSiteConfig"]: deleteSiteConfig_export_1.default,
    ["admin.deleteStoryConfig"]: deleteStoryConfig_export_1.default,
    ["admin.getAllPages"]: getAllPages_export_1.default,
    ["admin.getAllStories"]: getAllStories_export_1.default,
    ["admin.getComponentStory"]: getComponentStory_export_1.default,
    ["admin.savePageConfig"]: savePageConfig_export_1.default,
    ["admin.saveSiteConfig"]: saveSiteConfig_export_1.default,
    ["admin.saveStoryConfig"]: saveStoryConfig_export_1.default,
    ["page.getPageConfig"]: getPageConfig_export_1.default,
    ["page.getPageConfigFromId"]: getPageConfigFromId_export_1.default,
    ["site.getConfig"]: getConfig_export_1.default,
};
driver["admin"] = {};
driver["admin"]["deletePageConfig"] = deletePageConfig_export_1.default;
driver["admin"]["deleteSiteConfig"] = deleteSiteConfig_export_1.default;
driver["admin"]["deleteStoryConfig"] = deleteStoryConfig_export_1.default;
driver["admin"]["getAllPages"] = getAllPages_export_1.default;
driver["admin"]["getAllStories"] = getAllStories_export_1.default;
driver["admin"]["getComponentStory"] = getComponentStory_export_1.default;
driver["admin"]["savePageConfig"] = savePageConfig_export_1.default;
driver["admin"]["saveSiteConfig"] = saveSiteConfig_export_1.default;
driver["admin"]["saveStoryConfig"] = saveStoryConfig_export_1.default;
driver["page"] = {};
driver["page"]["getPageConfig"] = getPageConfig_export_1.default;
driver["page"]["getPageConfigFromId"] = getPageConfigFromId_export_1.default;
driver["site"] = {};
driver["site"]["getConfig"] = getConfig_export_1.default;
exports.default = driver;
//# sourceMappingURL=driver.js.map