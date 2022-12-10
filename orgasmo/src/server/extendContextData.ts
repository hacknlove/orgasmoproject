import deepmergeFactory from "@fastify/deepmerge";
import events from "./events";

const deepmerge = deepmergeFactory({
  mergeArray: (options) => (target, source) => options.clone(source),
});

export default async function extendContextData(ctx, params, pageConfig) {
  ctx.contextData = pageConfig.contextData ?? {};

  if (!pageConfig.getContextData) {
    return;
  }

  const methods =
    typeof pageConfig.getContextData === "string"
      ? [pageConfig.getContextData]
      : pageConfig.getContextData;

  for (const method of methods) {
    if (typeof ctx.driver[method] !== "function") continue;
    try {
      ctx.contextData = deepmerge(
        ctx.contextData,
        await ctx.driver[method](ctx, params, pageConfig)
      );
    } catch (error) {
      events.emit("error", {
        type: "driver",
        method,
        params: [ctx, params, pageConfig],
        error,
      });
      return {
        notFound: true,
      };
    }
  }
}
