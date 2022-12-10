import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middlewareFactory({ middlewares }) {
  if (!middlewares) {
    return undefined;
  }

  const middlewareArray = Object.keys(middlewares)
    .sort()
    .map((key) => middlewares[key]);

  return async function middlewareRunner(req: NextRequest) {
    const ctx = {
      middlewares,
      res: NextResponse.next(),
      req,
    };
    for (const middlewareFunction of middlewareArray) {
      if (typeof middlewareFunction !== "function") {
        continue;
      }
      if (
        middlewareFunction.pathRegExpFilter?.test &&
        !middlewareFunction.pathRegExpFilter.test(req.nextUrl.pathname)
      ) {
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

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
