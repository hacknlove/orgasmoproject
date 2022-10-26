"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const consts_1 = require("../consts");
async function siteGetConfig() {
    const siteConfig = await (0, fs_extra_1.readJson)(consts_1.sitePath, { throws: false });
    if (!siteConfig) {
        return {};
    }
    return siteConfig;
}
exports.default = siteGetConfig;
//# sourceMappingURL=getConfig.export.js.map