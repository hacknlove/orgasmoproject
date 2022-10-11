import { waitForIt, staticPaths, dynamicPaths } from "../parseDirectory";

export default async function getPageConfig(ctx) {
  await waitForIt;
  const resolvedPath = ctx.resolvedUrl.replace(/\?.*$/, "");

  const exactMatch = staticPaths.get(resolvedPath);

  if (exactMatch) {
    ctx.parsedPath = {};
    return exactMatch;
  }

  for (const [, { match, pageConfig }] of dynamicPaths) {
    const matched = match(resolvedPath);
    if (matched) {
      ctx.parsedPath = matched.params;
      return pageConfig;
    }
  }
}
