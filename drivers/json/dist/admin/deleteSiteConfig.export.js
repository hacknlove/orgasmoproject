"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../consts");
const fs_extra_1 = require("fs-extra");
async function SavePageConfig() {
    await (0, fs_extra_1.remove)(consts_1.sitePath);
}
exports.default = SavePageConfig;
//# sourceMappingURL=deleteSiteConfig.export.js.map