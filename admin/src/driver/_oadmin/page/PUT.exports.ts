import { cleanAwaitJson } from "@orgasmo/orgasmo/cleanJson";

export default async function upsertPageConfigApi(ctx) {
  if (!ctx.driver["admin.upsertPageConfig"]) {
    ctx.res.json({
      error: {
        title: "method not available",
        text: 'The active driver has no "admin.upsertPageConfig" method.',
      },
    });
  }
  const { pageConfig } = ctx.req.body;

  return ctx.res.json(
    await cleanAwaitJson(ctx.driver["admin.upsertPageConfig"](ctx, pageConfig))
  );
}
