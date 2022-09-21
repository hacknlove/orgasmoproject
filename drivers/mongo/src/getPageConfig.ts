import mongoProxy from "./mongoProxy";
import { match } from "path-to-regexp";

export default async function getPageConfig(ctx) {
  const resolvedPath = ctx.resolvedUrl.replace(/\?.*$/, "");
  await mongoProxy.connect();

  const exactMatch = await mongoProxy.pageConfigs
    .find({
      staticPath: resolvedPath,
    })
    .toArray();

  if (exactMatch.length) {
    ctx.parsedPath = {};
    return exactMatch.length > 1 ? exactMatch : exactMatch[0];
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

  let matchedDynamicPath;
  const pageConfigs: any[] = [];
  for (const pageConfig of regexps) {
    if (matchedDynamicPath === pageConfig.dynamicPath) {
      pageConfigs.push(pageConfig);
      continue;
    }
    if (matchedDynamicPath) {
      break;
    }
    const matched = match(pageConfig.dynamicPath)(resolvedPath);
    if (matched) {
      ctx.parsedPath = matched.params;
      matchedDynamicPath = pageConfig.dynamicPath;
      pageConfigs.push(pageConfig);
    }
  }

  switch (pageConfigs.length) {
    case 0:
      return undefined;
    case 1:
      return pageConfigs[0];
    default:
      return pageConfigs;
  }
}
