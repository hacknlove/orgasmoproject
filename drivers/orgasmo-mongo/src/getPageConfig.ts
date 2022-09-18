import mongoProxy from "./mongoProxy";
import { match } from "path-to-regexp";

export default async function getPageConfig(ctx) {
  const resolvedPath = ctx.resolvedUrl.replace(/\?.*$/, "");

  const exactMatch = await mongoProxy.pageConfigs.findOne({
    staticPath: resolvedPath,
  });

  if (exactMatch) {
    ctx.parsedPath = {};
    return exactMatch;
  }

  const regexps = await mongoProxy.pageConfigs
    .find({ dynamicPath: { $exists: 1 } })
    .toArray();

  regexps.sort((a, b) => {
    const lastA = a.dynamicPath
      .replace(/\/:/g, "/￾") // unicode FFFE before last character
      .replace(/\/\(/g, "/￿"); // unicode FFFF last character
    const lastB = b.dynamicPath
      .replace(/\/:/g, "/￾") // unicode FFFE before last character
      .replace(/\/\(/g, "/￿"); // unicode FFFF last character

    return lastA < lastB ? -1 : 1;
  });

  for (const pageConfig of regexps) {
    const matched = match(pageConfig.dynamicPath)(resolvedPath);
    if (matched) {
      ctx.parsedPath = matched.params;
      return pageConfig;
    }
  }
}
