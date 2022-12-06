"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
async function getPageConfigFromId(pageId) {
    await mongoProxy_1.default.connect();
    return mongoProxy_1.default.pages.findOne({ pageId });
}
exports.default = getPageConfigFromId;
//# sourceMappingURL=getPageConfigFromId.export.js.map