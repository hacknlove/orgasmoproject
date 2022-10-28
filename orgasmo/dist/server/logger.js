"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = require("pino");
const events_1 = require("./events");
const logger = new Proxy((0, pino_1.default)(), {
    get(target, key) {
        return (mergingObject, message, ...interpolationValues) => {
            events_1.default.emit(`logger-${key.toString()}`, mergingObject);
            target[key](mergingObject, message, ...interpolationValues);
        };
    },
});
exports.default = logger;
//# sourceMappingURL=logger.js.map