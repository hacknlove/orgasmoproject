"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getName_1 = require("./getName");
function map({ route = "", filename, from, type }) {
    return {
        from,
        route,
        filename,
        type,
        importName: `${route.replace(/[^a-z0-9_]/g, "ー")}ー${filename}`,
        name: (0, getName_1.default)(route, filename),
    };
}
exports.default = map;
//# sourceMappingURL=map.js.map