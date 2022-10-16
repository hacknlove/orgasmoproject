import { cleanAwaitJson } from "@orgasmo/orgasmo/cleanJson";

export default async function deleteStoryConfigApi(ctx) {
  if (!ctx.driver["admin.deleteStoryConfig"]) {
    ctx.res.json({
      error: {
        title: "method not available",
        text: 'The active driver has no "admin.deleteStoryConfig" method.',
      },
    });
  }

  return ctx.res.json(
    await cleanAwaitJson(
      ctx.driver["admin.deleteStoryConfig"](ctx, ctx.req.query)
    )
  );
}
