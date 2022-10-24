"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cssvarize(obj) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [`--${key}`, value]));
}
exports.default = cssvarize;
//# sourceMappingURL=cssvarize.js.map