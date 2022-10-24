"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDirectory_1 = require("./parseDirectory");
async function getPageConfigFromId(pageId) {
    await parseDirectory_1.waitForIt;
    return parseDirectory_1.ids.get(pageId);
}
exports.default = getPageConfigFromId;
//# sourceMappingURL=getPageConfigFromId.js.map