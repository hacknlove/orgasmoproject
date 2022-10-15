import { cleanAwaitJson } from "@orgasmo/orgasmo/cleanJson";

export default async function deletePageConfigApi(ctx) {
  if (!ctx.driver["admin.deletePageConfig"]) {
    ctx.res.json({
      error: {
        title: "method not available",
        text: 'The active driver has no "admin.deletePageConfig" method.',
      },
    });
  }
  const { storyConfig } = ctx.req.body;

  return ctx.res.json(
    await cleanAwaitJson(ctx.driver["admin.deletePageConfig"](ctx, storyConfig))
  );
}
