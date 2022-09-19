import strapiFetch from "./strapiFetch";
import { match } from "path-to-regexp";

export default async function getPageConfig(ctx) {
  const resolvedPath = ctx.resolvedUrl.replace(/\?.*$/, "");

  const exactMatch = await strapiFetch(`page-configs?filters[staticPath][$eq]=${resolvedPath}&populate=*`)

  if (exactMatch.error) {
    ctx.events.emit("error", {
      type: "driver",
      driver: process.env.ORGASMO_DRIVER,
      method: "page.getPageConfig",
      error: exactMatch.error
    })
    return null
  }

  if (exactMatch?.data.length) {
    ctx.parsedPath = {};
    return exactMatch.data;
  }

  const dynamicPages = await strapiFetch(`page-configs?filters[dynamicPath][$notNull]&populate=*&pagination[pageSize]=100`)

  if (dynamicPages.error) {
    ctx.events.emit("error", {
      type: "driver",
      driver: process.env.ORGASMO_DRIVER,
      method: "page.getPageConfig",
      error: dynamicPages.error
    })
    return null
  }

  dynamicPages.data.sort((a, b) => {
    const lastA = a.attributes.dynamicPath
      .replace(/\/:/g, "/￾") // unicode FFFE before last character
      .replace(/\/\(/g, "/￿"); // unicode FFFF last character
    const lastB = b.attributes.dynamicPath
      .replace(/\/:/g, "/￾") // unicode FFFE before last character
      .replace(/\/\(/g, "/￿"); // unicode FFFF last character

    return lastA < lastB ? -1 : 1;
  });

  let matchedDynamicPath
  const pageConfigs: any[] = [];

  for (const pageConfig of dynamicPages.data) {
    if (matchedDynamicPath === pageConfig.dynamicPath) {
      pageConfigs.push(pageConfig)
      continue
    }
    if (matchedDynamicPath) {
      break
    }

    const matched = match(pageConfig.dynamicPath)(resolvedPath);
    if (matched) {
      ctx.parsedPath = matched.params;
      matchedDynamicPath = pageConfig.dynamicPath
      pageConfigs.push(pageConfig)
    }
  }

  switch (pageConfigs.length) {
    case 0:
      return null
    case 1:
      return pageConfigs[0]
    default:
      return pageConfigs
  }
}
