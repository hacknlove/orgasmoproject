import { cleanAwaitJson } from "@orgasmo/orgasmo/cleanJson";

export default async function updateStoryConfigApi(ctx) {
  if (!ctx.driver["admin.updateStoryConfig"]) {
    ctx.res.json({
      error: {
        title: "method not available",
        text: 'The active driver has no "admin.updateStoryConfig" method.',
      },
    });
  }
  const { storyConfig } = ctx.req.body;

  return ctx.res.json(
    await cleanAwaitJson(
      ctx.driver["admin.updateStoryConfig"](ctx, storyConfig)
    )
  );
}
