"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDirectory_1 = require("../kvStorage/parseDirectory");
async function getConfig(ctx, key) {
    await parseDirectory_1.waitForIt;
    return parseDirectory_1.kvStorage[key] ?? {};
}
exports.default = getConfig;
//# sourceMappingURL=getValue.export.js.map