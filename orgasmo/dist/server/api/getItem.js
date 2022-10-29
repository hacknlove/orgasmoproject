"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processRow_1 = require("../lib/processRow");
const cleanJson_1 = require("../lib/cleanJson");
const serialization_1 = require("../lib/serialization");
const parseCommand_1 = require("./parseCommand");
const timechunks_1 = require("../lib/timechunks");
const cacheControl_1 = require("../lib/cacheControl");
async function getItem(ctx) {
    const { req, res, driver } = ctx;
    const command = await (0, parseCommand_1.default)({ req, res, driver });
    if (!command) {
        return res.json(null);
    }
    const pageConfig = await driver.page.getPageConfigFromId(command.pageId, ctx);
    if (!pageConfig) {
        return res.json(null);
    }
    if (!pageConfig.areas[command.area]) {
        return res.json(null);
    }
    const areaConfig = pageConfig.areas[command.area];
    const number = parseInt(req.query.n);
    const rowConfig = areaConfig.items?.[number] ??
        (await driver[areaConfig.getItem]?.({
            ...command,
            number,
            relative: number - (areaConfig.items?.length ?? 0),
        }));
    if (!rowConfig) {
        return res.json(null);
    }
    const row = await (0, cleanJson_1.cleanAwaitJson)(await (0, processRow_1.default)({ rowConfig, params: command.params, ctx }));
    if (row.props.getMore) {
        row.props.src = `/api/_ogm?c=${(0, serialization_1.serialize)({
            ...row.props.getMore,
            expire: (0, timechunks_1.currentTimeChunk)(rowConfig.timeChunk).expire,
            roles: req.user.roles,
        })}`;
        delete row.props.getMore;
    }
    (0, cacheControl_1.default)({ ctx: { res }, item: rowConfig });
    res.json({
        row,
        src: `/api/_ogr?c=${(0, serialization_1.serialize)({
            ...command,
            expire: (0, timechunks_1.currentTimeChunk)(rowConfig.timeChunk).expire,
            roles: req.user.roles,
        })}`,
    });
}
exports.default = getItem;
//# sourceMappingURL=getItem.js.map