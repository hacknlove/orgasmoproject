"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matchCriteria_1 = require("./matchCriteria");
function filterCriteria(pageConfigs, criteria, actual) {
    const actualSet = new Set(actual);
    return pageConfigs.filter((pageConfig) => (0, matchCriteria_1.default)({
        rules: pageConfig[criteria],
        actualSet,
    }));
}
exports.default = filterCriteria;
//# sourceMappingURL=filterCriteria.js.map