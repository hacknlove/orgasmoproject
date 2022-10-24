"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPage_1 = require("./getPage");
const getUser_1 = require("../lib/getUser");
const cacheFactory_1 = require("../cache/cacheFactory");
const events_1 = require("../events");
function getServerSidePropsFactory({ driver, noCache, }) {
    return async function GetServerSideProps(ctx) {
        ctx.noCache = noCache;
        ctx.driver = driver;
        ctx.setCookies = [];
        ctx.rewrites = 0;
        ctx.events = events_1.default;
        await Promise.all([(0, getUser_1.default)(ctx), noCache || (0, cacheFactory_1.default)(ctx)]);
        return (0, getPage_1.default)(ctx);
    };
}
exports.default = getServerSidePropsFactory;
//# sourceMappingURL=factory.js.map