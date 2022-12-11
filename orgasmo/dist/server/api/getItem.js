"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemByNumber = void 0;
const processRow_1 = require("../lib/processRow");
const cleanJson_1 = require("../lib/cleanJson");
const serialization_1 = require("../lib/serialization");
const parseCommand_1 = require("./parseCommand");
const timechunks_1 = require("../lib/timechunks");
const cacheControl_1 = require("../lib/cacheControl");
const skipThisRow_1 = require("../lib/skipThisRow");
const extendContextData_1 = require("../extendContextData");
async function getItemByNumber(ctx, { pageConfig, areaConfig, command }) {
    const { req, res, driver } = ctx;
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
    if ((0, skipThisRow_1.default)({ rowConfig, ctx })) {
        req.query.n = `${number + 1}`;
        return getItemByNumber(ctx, { pageConfig, areaConfig, command });
    }
    if (rowConfig.getProps) {
        await (0, extendContextData_1.default)(ctx, command.params, pageConfig);
    }
    const row = await (0, cleanJson_1.cleanAwaitJson)((0, processRow_1.default)({ rowConfig, params: command.params, ctx }));
    if (row?.props.getMore) {
        row.props.src = `/api/_ogm?c=${(0, serialization_1.serialize)({
            ...row.props.getMore,
            expire: (0, timechunks_1.currentTimeChunk)(rowConfig.timeChunk).expire,
            roles: req.user.roles,
            labels: req.labels
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
            labels: req.labels
        })}`,
    });
}
exports.getItemByNumber = getItemByNumber;
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
    return getItemByNumber(ctx, { pageConfig, areaConfig, command });
}
exports.default = getItem;
//# sourceMappingURL=getItem.js.map