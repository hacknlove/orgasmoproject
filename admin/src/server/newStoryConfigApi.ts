import { cleanAwaitJson } from "@orgasmo/orgasmo/cleanJson";

export default async function newStoryConfigApi(ctx) {
  if (!ctx.driver["admin.newStoryConfig"]) {
    ctx.res.json({
      error: {
        title: "method not available",
        text: 'The active driver has no "admin.newStoryConfig" method.',
      },
    });
  }
  const { storyConfig } = ctx.req.body;

  return ctx.res.json(
    await cleanAwaitJson(ctx.driver["admin.newStoryConfig"](ctx, storyConfig))
  );
}
