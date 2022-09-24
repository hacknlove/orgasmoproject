export default function mapStrapiToOrgasmo(pageConfig) {
  if (!pageConfig) {
    return;
  }
  Object.entries(pageConfig.attributes).forEach(([key, value]) => {
    if (value === null) {
      pageConfig.attributes[key] = undefined;
    }
  });
  return pageConfig.attributes;
}
