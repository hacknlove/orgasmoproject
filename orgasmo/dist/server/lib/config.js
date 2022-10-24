"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_RENEW = exports.CACHE_EXPIRATION = exports.MAX_REWRITES = void 0;
exports.MAX_REWRITES = process.env.MAX_REWRITES
    ? parseInt(process.env.MAX_REWRITES)
    : 5;
exports.CACHE_EXPIRATION = process.env.CACHE_EXPIRATION
    ? parseInt(process.env.CACHE_EXPIRATION)
    : 1000 * 60 * 60;
exports.CACHE_RENEW = process.env.CACHE_RENEW
    ? parseInt(process.env.CACHE_RENEW)
    : exports.CACHE_EXPIRATION / 2;
//# sourceMappingURL=config.js.map