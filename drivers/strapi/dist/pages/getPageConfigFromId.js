"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
const mapStrapiToOrgasmo_1 = require("../mapStrapiToOrgasmo");
async function getPageConfigFromId(pageId, ctx) {
    const exactMatch = await (0, strapiFetch_1.default)(`page-configs?filters[pageId][$eq]=${pageId}`);
    if (exactMatch.error) {
        ctx.events.emit("error", {
            type: "driver",
            driver: process.env.ORGASMO_DRIVER,
            method: "page.getPageConfigFromId",
            error: exactMatch.error,
        });
        return null;
    }
    return (0, mapStrapiToOrgasmo_1.default)(exactMatch.data[0]);
}
exports.default = getPageConfigFromId;
//# sourceMappingURL=getPageConfigFromId.js.map