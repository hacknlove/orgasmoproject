"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const dataPath = process.env.FILESYSTEM_DATA_PATH ?? "drivers/@orgasmo/json/data";
async function siteGetConfig() {
    const siteConfig = await (0, fs_extra_1.readJson)(`${dataPath}/site.json`, { throws: false });
    if (!siteConfig) {
        return {};
    }
    return siteConfig;
}
exports.default = siteGetConfig;
//# sourceMappingURL=getConfig.export.js.map