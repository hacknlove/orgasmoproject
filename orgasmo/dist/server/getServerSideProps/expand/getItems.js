"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processRow_1 = require("../../lib/processRow");
const serialization_1 = require("../../lib/serialization");
const timechunks_1 = require("../../lib/timechunks");
async function getItems({ items: itemsProp = [], params, ctx, limit = Infinity, timeChunk, getItem, }) {
    const items = [];
    const z = limit === Infinity || limit === -1 || limit === null
        ? itemsProp.length
        : limit;
    for (let i = 0; i < z; i++) {
        const rowConfig = itemsProp[i] ??
            (getItem &&
                (await ctx.driver[getItem]?.({
                    params,
                    number: i,
                    relative: i - itemsProp.length,
                })));
        if (!rowConfig) {
            break;
        }
        const rowTimeChunk = (0, timechunks_1.maxTimeChunk)({
            timeChunkConf: rowConfig.timeChunk,
            timeChunk,
        });
        const row = await (0, processRow_1.default)({ rowConfig, params, ctx });
        if (row?.props?.getMore) {
            row.props.src = `/api/_ogm?c=${(0, serialization_1.serialize)({
                ...row.props.getMore,
                roles: ctx.req.user.roles,
                expire: rowTimeChunk.expire,
            })}`;
            delete row.props.getMore;
        }
        if (row?.props?.cssVars) {
            row.props.cssVars = Object.fromEntries(Object.entries(row.props.cssVars).map(([key, value]) => [
                `--${key}`,
                value,
            ]));
        }
        items.push(row);
        if (!--limit) {
            break;
        }
    }
    return items;
}
exports.default = getItems;
//# sourceMappingURL=getItems.js.map