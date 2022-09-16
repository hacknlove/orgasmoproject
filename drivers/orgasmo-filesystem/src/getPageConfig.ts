import { waitForIt, paths } from "./parseDirectory";

export default async function getPageConfig(ctx) {
  await waitForIt;
  const resolvedPath = ctx.resolvedUrl.replace(/\?.*$/, "");

  const exactMatch = paths.get(resolvedPath);

  if (exactMatch && !resolvedPath.match(/\/[:(]/)) {
    ctx.parsedPath = {};
    return exactMatch.pageConfig;
  }

  for (const [path, { match, pageConfig }] of paths) {
    const matched = match(resolvedPath);
    if (matched) {
      ctx.parsedPath = matched.params;
      return pageConfig;
    }
  }
}
