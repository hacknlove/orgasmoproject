import strapiFetch from "./strapiFetch";
import { match } from "path-to-regexp";
import mapStrapiToOrgasmo from "./mapStrapiToOrgasmo";

export default async function getPageConfig(ctx) {
  const resolvedPath = ctx.resolvedUrl.replace(/\?.*$/, "");

  const exactMatch = await strapiFetch(`page-configs?filters[staticPath][$eq]=${resolvedPath}&populate[0]=footer&populate[1]=main.items&populate[2]=header`)

  if (exactMatch.error) {
    ctx.events.emit("error", {
      type: "driver",
      driver: process.env.ORGASMO_DRIVER,
      method: "page.getPageConfig",
      error: exactMatch.error
    })
    return null
  }
  ctx.parsedPath = {};


  switch (exactMatch.data.length) {
    case 0:
      break
    case 1:
      return mapStrapiToOrgasmo(exactMatch.data[0])
    default:
      return exactMatch.data.map(mapStrapiToOrgasmo)
  }

  const dynamicPages = await strapiFetch(`page-configs?filters[dynamicPath][$notNull]=true&pagination[pageSize]=100&populate[0]=footer&populate[1]=main.items&populate[2]=header`)

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
    if (matchedDynamicPath === pageConfig.attributes.dynamicPath) {
      pageConfigs.push(pageConfig)
      continue
    }
    if (matchedDynamicPath) {
      break
    }

    const matched = match(pageConfig.attributes.dynamicPath)(resolvedPath);
    if (matched) {
      ctx.parsedPath = matched.params;
      matchedDynamicPath = pageConfig.attributes.dynamicPath
      pageConfigs.push(pageConfig)
    }
  }

  switch (pageConfigs.length) {
    case 0:
      return undefined
    case 1:
      return mapStrapiToOrgasmo(pageConfigs[0])
    default:
      return pageConfigs.map(mapStrapiToOrgasmo)
  }
}
