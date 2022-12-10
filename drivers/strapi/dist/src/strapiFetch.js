"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@orgasmo/orgasmo/config");
async function strapiFetch(endpoint, options) {
    const { url, token } = config_1.default["drivers.@orgasmo.strapi"];
    const response = await fetch(`${url}${endpoint}`, {
        method: "GET",
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            ...options?.headers,
        },
    })
        .then((r) => r.json())
        .catch((error) => ({ error }));
    return response;
}
exports.default = strapiFetch;
//# sourceMappingURL=strapiFetch.js.map