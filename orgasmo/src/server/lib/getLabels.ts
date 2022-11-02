import logger from "../logger";

export default async function getLabels(ctx) {
  if (ctx.req.labels) {
    return;
  }

  ctx.req.labels = [];

  if (!ctx.driver.labels?.getLabels) {
    return;
  }
  try {
    ctx.req.labels = (await ctx.driver.labels.getLabels(ctx)) || [];
  } catch (error) {
    logger.error({ error, ctx }, "Error calling labels.getLabels");
  }
}
