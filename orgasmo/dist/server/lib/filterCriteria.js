"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterCriteria(pageConfigs, criteria, actual) {
    const actualSet = new Set(actual);
    return pageConfigs.filter((pageConfig) => {
        const rules = pageConfig[criteria];
        if (!rules) {
            return true;
        }
        if (rules.cannot) {
            for (const key of rules.cannot) {
                if (actualSet.has(key)) {
                    return false;
                }
            }
        }
        if (rules.must) {
            for (const key of rules.must) {
                if (!actualSet.has(key)) {
                    return false;
                }
            }
        }
        if (rules.any) {
            for (const key of rules.any) {
                if (actualSet.has(key)) {
                    return true;
                }
            }
            return false;
        }
        return true;
    });
}
exports.default = filterCriteria;
//# sourceMappingURL=filterCriteria.js.map