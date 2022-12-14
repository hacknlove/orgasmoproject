"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const pageConfigsCollectionName = process.env.ORGASMO_MONGO_PAGES_COLLECTION ?? "pageConfigs";
async function SavePageConfig(ctx, pageConfig) {
    await mongoProxy_1.default.waitfor;
    delete pageConfig._id;
    await mongoProxy_1.default.pages.updateOne({
        pageId: pageConfig.pageId,
    }, {
        $set: pageConfig,
    }, {
        upsert: true,
    });
    return { ok: true };
}
exports.default = SavePageConfig;
//# sourceMappingURL=savePageConfig.export.js.map