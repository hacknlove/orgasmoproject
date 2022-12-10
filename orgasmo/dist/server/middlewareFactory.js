"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const server_1 = require("next/server");
function middlewareFactory({ middlewares }) {
    if (!middlewares) {
        return undefined;
    }
    const middlewareArray = Object.keys(middlewares)
        .sort()
        .map((key) => middlewares[key]);
    return async function middlewareRunner(req) {
        const ctx = {
            middlewares,
            res: server_1.NextResponse.next(),
            req,
        };
        for (const middlewareFunction of middlewareArray) {
            if (typeof middlewareFunction !== "function") {
                continue;
            }
            if (middlewareFunction.pathRegExpFilter?.test && !middlewareFunction.pathRegExpFilter.test(req.nextUrl.pathname)) {
                continue;
            }
            const action = await middlewareFunction(ctx);
            if (action === "end") {
                break;
            }
        }
        return ctx.res;
    };
}
exports.default = middlewareFactory;
exports.config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico).*)',
    ],
};
//# sourceMappingURL=middlewareFactory.js.map