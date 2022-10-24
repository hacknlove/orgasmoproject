"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const siteCollectionName = process.env.ORGASMO_MONGO_SITE_COLLECTION ?? "site";
async function deleteStoryConfig() {
    await mongoProxy_1.default.connect();
    await mongoProxy_1.default[siteCollectionName].deleteOne({});
}
exports.default = deleteStoryConfig;
//# sourceMappingURL=deleteSiteConfig.export.js.map