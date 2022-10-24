"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("./mongoProxy");
const pageConfigsCollectionName = process.env.ORGASMO_MONGO_PAGES_COLLECTION ?? "pageConfigs";
async function getPageConfigFromId(pageId) {
    return mongoProxy_1.default[pageConfigsCollectionName].findOne({ pageId });
}
exports.default = getPageConfigFromId;
//# sourceMappingURL=getPageConfigFromId.js.map