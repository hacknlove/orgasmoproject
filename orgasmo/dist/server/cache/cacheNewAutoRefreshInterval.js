"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maps_1 = require("./maps");
const cacheRefresh_1 = require("./cacheRefresh");
function cacheNewAutoRefreshInterval({ ctx, key, item }) {
    const autoRefresh = setInterval(() => (0, cacheRefresh_1.default)({ ctx, key, item }), item.autoRefresh.ms);
    maps_1.autoRefreshInterval.set(key, autoRefresh);
}
exports.default = cacheNewAutoRefreshInterval;
//# sourceMappingURL=cacheNewAutoRefreshInterval.js.map