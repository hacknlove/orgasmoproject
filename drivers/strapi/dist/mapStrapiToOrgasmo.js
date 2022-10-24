"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapStrapiToOrgasmo(pageConfig) {
    if (!pageConfig) {
        return;
    }
    Object.entries(pageConfig.attributes).forEach(([key, value]) => {
        if (value === null) {
            pageConfig.attributes[key] = undefined;
        }
    });
    return pageConfig.attributes;
}
exports.default = mapStrapiToOrgasmo;
//# sourceMappingURL=mapStrapiToOrgasmo.js.map