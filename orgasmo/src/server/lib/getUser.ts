import events from "../events";

export default async function getUser(ctx) {
  if (ctx.req.user) {
    return;
  }

  ctx.req.user = {
    roles: [],
  };

  if (!ctx.driver.user?.getUser) {
    return;
  }
  try {
    Object.assign(ctx.req.user, await ctx.driver.user.getUser(ctx));
  } catch (error) {
    events.emit("error", {
      type: "driver",
      method: "user.getUser",
      params: [ctx],
      error,
    });
  }
}
