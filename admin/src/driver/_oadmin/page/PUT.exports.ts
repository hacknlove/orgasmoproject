import { cleanAwaitJson } from "@orgasmo/orgasmo/cleanJson";

export default async function updatePageConfigApi(ctx) {
  if (!ctx.driver["admin.updatePageConfig"]) {
    ctx.res.json({
      error: {
        title: "method not available",
        text: 'The active driver has no "admin.updatePageConfig" method.',
      },
    });
  }
  const { pageConfig } = ctx.req.body;

  return ctx.res.json(
    await cleanAwaitJson(ctx.driver["admin.updatePageConfig"](ctx, pageConfig))
  );
}
