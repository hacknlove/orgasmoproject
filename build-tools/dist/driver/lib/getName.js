"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getName(route, filename) {
    return filename === "index"
        ? route.replace(/^.*\/([^/]*?)$/g, "$1")
        : filename;
}
exports.default = getName;
//# sourceMappingURL=getName.js.map