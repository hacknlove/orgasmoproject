"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const pageConfigsCollectionName = process.env.ORGASMO_MONGO_PAGES_COLLECTION ?? "pageConfigs";
async function deletePageConfig(ctx, pageId) {
    await mongoProxy_1.default.waitfor;
    await mongoProxy_1.default.pages.deleteOne({
        pageId,
    });
    return true;
}
exports.default = deletePageConfig;
//# sourceMappingURL=deletePageConfig.export.js.map