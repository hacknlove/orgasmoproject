"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serialization_1 = require("../../lib/serialization");
const getItems_1 = require("./getItems");
async function expandArea({ ctx, name, pageId, params, timeChunk, areaConfig, }) {
    const items = (0, getItems_1.default)({
        ctx,
        params,
        items: areaConfig.items,
        limit: areaConfig.ssrSize,
        timeChunk,
        getItem: areaConfig.getItem,
    });
    const area = {
        ...areaConfig,
        items,
    };
    if (areaConfig.mode === "bubble" || areaConfig.mode === "grow") {
        area.src = `/api/_ogr?c=${(0, serialization_1.serialize)({
            pageId,
            area: name,
            params,
            roles: ctx.req.user.roles,
            expire: timeChunk.expire,
        })}`;
    }
    delete area.getItem;
    return area;
}
exports.default = expandArea;
//# sourceMappingURL=area.js.map