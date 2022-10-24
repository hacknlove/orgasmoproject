"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const siteCollectionName = process.env.ORGASMO_MONGO_SITE_COLLECTION ?? "site";
async function getConfig() {
    await mongoProxy_1.default.connect();
    return (await mongoProxy_1.default[siteCollectionName].findOne({})) ?? {};
}
exports.default = getConfig;
//# sourceMappingURL=getConfig.export.js.map