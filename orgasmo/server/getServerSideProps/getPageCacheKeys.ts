import { cencode } from "cencode";
import events from "../events";

export default async function* getPageCacheKeys(ctx) {
  try {
    const methods = await ctx.driver.page.allParameterMethods?.(ctx);

    if (methods) {
      for (const method of methods) {
        yield cencode(await ctx.driver[method](ctx));
      }
    }
  } catch (error) {
    events.emit("error", {
      type: "driver",
      method: "page.allParameterMethods",
      params: [ctx],
      error,
    });
  }

  yield cencode({ params: ctx.params, roles: ctx.req.user.roles });
}
