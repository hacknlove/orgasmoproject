import skipThisRow from "./skipThisRow";

export default async function processRow({ rowConfig, params, ctx }) {
  if (skipThisRow({ rowConfig, ctx })) {
    return null;
  }
  const row = {
    type: rowConfig.type,
    props: rowConfig.props ?? {},
  };

  if (ctx.driver[rowConfig.getProps]) {
    row.props = {
      ...(await ctx.driver[rowConfig.getProps]({
        rowConfig,
        params,
        ctx,
      })),
      ...row.props,
    };
  }

  return row;
}
