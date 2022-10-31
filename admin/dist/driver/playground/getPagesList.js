"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPagesList({ driver }) {
    return driver?.admin?.getAllPages?.()?.catch(() => ({})) || {};
}
exports.default = getPagesList;
//# sourceMappingURL=getPagesList.js.map