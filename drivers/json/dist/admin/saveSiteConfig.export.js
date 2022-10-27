"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const consts_1 = require("../consts");
async function SavePageConfig(ctx, siteConfig) {
    await (0, fs_extra_1.outputJson)(consts_1.sitePath, siteConfig, { spaces: 2 });
}
exports.default = SavePageConfig;
//# sourceMappingURL=saveSiteConfig.export.js.map