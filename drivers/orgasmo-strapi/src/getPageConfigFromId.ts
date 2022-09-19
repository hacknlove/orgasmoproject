import strapiFetch from "./strapiFetch";

export default async function getPageConfigFromId(pageId, ctx) {
  const exactMatch = await strapiFetch(`page-configs?filters[pageId][$eq]=${pageId}&populate=*`)

  if (exactMatch.error) {
    ctx.events.emit("error", {
      type: "driver",
      driver: process.env.ORGASMO_DRIVER,
      method: "page.getPageConfig",
      error: exactMatch.error
    })
    return null
  }

  return exactMatch;
}
