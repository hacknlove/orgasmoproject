"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Proxy({}, {
    get(_, key) {
        if (global.config[key]) {
            return global.config[key];
        }
        if (typeof key === "symbol") {
            console.error("Getting a symbol!", key);
            return undefined;
        }
        let configCursor = global.config;
        const path = key.split(".");
        for (const segment of path) {
            configCursor = configCursor[segment];
            if (configCursor === undefined) {
                console.error("Configuration missing", key);
                return undefined;
            }
        }
        return configCursor;
    },
    has(_, key) {
        if (global.config[key]) {
            return true;
        }
        if (typeof key === "symbol") {
            console.error("Getting a symbol!", key);
            return false;
        }
        let configCursor = global.config;
        const path = key.split(".");
        for (const segment of path) {
            configCursor = configCursor[segment];
            if (configCursor === undefined) {
                return true;
            }
        }
        return false;
    },
});
//# sourceMappingURL=config.js.map