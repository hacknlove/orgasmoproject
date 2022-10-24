"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheControl_1 = require("../lib/cacheControl");
const cleanJson_1 = require("../lib/cleanJson");
const serialization_1 = require("../lib/serialization");
const timechunks_1 = require("../lib/timechunks");
const parseCommand_1 = require("./parseCommand");
async function getMore({ req, res, driver }) {
    const command = await (0, parseCommand_1.default)({ req, res, driver });
    if (!command) {
        return;
    }
    const response = await (0, cleanJson_1.cleanAwaitJson)(driver[command.handler]({
        ...command,
        from: parseInt(req.query.from),
        count: parseInt(req.query.count),
    }));
    if (response.getMore) {
        response.src = `/api/_ogm?c=${(0, serialization_1.serialize)({
            ...response.getMore,
            expire: (0, timechunks_1.currentTimeChunk)(response.timeChunk).expire,
            roles: req.user.roles,
        })}`;
        delete response.getMore;
    }
    (0, cacheControl_1.default)({ ctx: { res }, item: response });
    delete response.timeChunk;
    delete response.private;
    res.json(response);
}
exports.default = getMore;
//# sourceMappingURL=getMore.js.map