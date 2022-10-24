"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheControl_1 = require("../lib/cacheControl");
const setCookies_1 = require("../lib/setCookies");
async function sendFullPage({ ctx, pageConfig }) {
    (0, setCookies_1.default)({ ctx, cookies: pageConfig.cookies });
    await (0, cacheControl_1.default)({ ctx, item: pageConfig });
    return pageConfig.response;
}
exports.default = sendFullPage;
//# sourceMappingURL=sendFullPage.js.map