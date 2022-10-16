import { cleanAwaitJson } from "@orgasmo/orgasmo/cleanJson";

export default async function newPageConfigApi(ctx) {
  if (!ctx.driver["admin.newPageConfig"]) {
    ctx.res.json({
      error: {
        title: "method not available",
        text: 'The active driver has no "admin.newPageConfig" method.',
      },
    });
  }
  const { pageConfig } = ctx.req.body;

  return ctx.res.json(
    await cleanAwaitJson(ctx.driver["admin.newPageConfig"](ctx, pageConfig))
  );
}
