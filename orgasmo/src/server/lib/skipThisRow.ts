import matchCriteria from "./matchCriteria";

export default function skipThisRow({
  rowConfig,
  ctx,
}): Record<string, any> | undefined {
  if (
    !matchCriteria({
      rules: rowConfig.roles,
      actualSet: new Set(ctx.req.user.roles),
    })
  ) {
    return {};
  }

  if (
    !matchCriteria({
      rules: rowConfig.labels,
      actualSet: new Set(ctx.req.labels),
    })
  ) {
    return {};
  }
}
