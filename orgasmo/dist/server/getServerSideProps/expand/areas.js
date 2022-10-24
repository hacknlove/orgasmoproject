"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const area_1 = require("./area");
async function expandAreas({ ctx, areasConfig, params, timeChunk, pageId, }) {
    if (!areasConfig) {
        return {};
    }
    const response = {};
    for (const name of Object.keys(areasConfig)) {
        response[name] = (0, area_1.default)({
            ctx,
            params,
            name,
            pageId,
            areaConfig: areasConfig[name],
            timeChunk,
        });
    }
    return response;
}
exports.default = expandAreas;
//# sourceMappingURL=areas.js.map