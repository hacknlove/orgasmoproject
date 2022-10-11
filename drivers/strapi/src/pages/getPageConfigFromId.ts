import strapiFetch from "../strapiFetch";
import mapStrapiToOrgasmo from "../mapStrapiToOrgasmo";

export default async function getPageConfigFromId(pageId, ctx) {
  const exactMatch = await strapiFetch(
    `page-configs?filters[pageId][$eq]=${pageId}`
  );

  if (exactMatch.error) {
    ctx.events.emit("error", {
      type: "driver",
      driver: process.env.ORGASMO_DRIVER,
      method: "page.getPageConfigFromId",
      error: exactMatch.error,
    });
    return null;
  }

  return mapStrapiToOrgasmo(exactMatch.data[0]);
}
