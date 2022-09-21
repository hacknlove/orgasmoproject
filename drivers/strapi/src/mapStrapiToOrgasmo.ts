function mapItems(strapiItem) {
  const { extra, ...item } = strapiItem;
  return {
    ...item,
    ...extra,
  };
}

export default function mapStrapiToOrgasmo(pageConfig) {
  if (!pageConfig) {
    return;
  }

  const attributes = pageConfig.attributes;
  const response: Record<string, any> = {};

  response.pageId = attributes.pageId;
  response.cssVars = attributes.cssVars;
  response.header = attributes.header?.map(mapItems);
  response.footer = attributes.footer?.map(mapItems);
  response.main = attributes.main?.items?.map(mapItems);
  response.mainSsrSize = attributes.main?.ssrSize;
  response.mainThreshold = attributes.main?.threshold;
  response.mainMode = attributes.main?.mode;
  response.getItemConfig = attributes.getItemConfig;

  return response;
}
