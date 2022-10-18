import { cleanAwaitJson } from "@orgasmo/orgasmo/cleanJson";

export default async function upsertStoryConfigApi(ctx) {
  if (!ctx.driver["admin.upsertStoryConfig"]) {
    ctx.res.json({
      error: {
        title: "method not available",
        text: 'The active driver has no "admin.upsertStoryConfig" method.',
      },
    });
  }
  const { storyConfig } = ctx.req.body;

  return ctx.res.json(
    await cleanAwaitJson(
      ctx.driver["admin.upsertStoryConfig"](ctx, storyConfig)
    )
  );
}
