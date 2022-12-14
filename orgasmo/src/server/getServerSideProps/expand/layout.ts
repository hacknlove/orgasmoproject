import cssvarize from "../../lib/cssvarize";

export default async function expandLayout({ ctx, layoutConfig, params }) {
  if (!layoutConfig) {
    return;
  }
  const expandedMeta = ctx.driver[layoutConfig.getMeta]?.({
    ctx,
    params,
    meta: layoutConfig.meta,
  });
  const expandedCssVars = ctx.driver[layoutConfig.getCssVars]?.({
    ctx,
    params,
  });

  return {
    name: layoutConfig.name,
    cssVars: cssvarize({
      ...layoutConfig.cssVars,
      ...(await expandedCssVars),
    }),
    meta: (await expandedMeta) ?? layoutConfig.meta ?? [],
  };
}
