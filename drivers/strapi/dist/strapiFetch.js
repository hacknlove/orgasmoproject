"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
async function strapiFetch(endpoint, options) {
    const response = await fetch(`${STRAPI_API_URL}${endpoint}`, {
        method: "GET",
        ...options,
        headers: {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            ...options?.headers,
        },
    })
        .then((r) => r.json())
        .catch((error) => ({ error }));
    return response;
}
exports.default = strapiFetch;
//# sourceMappingURL=strapiFetch.js.map