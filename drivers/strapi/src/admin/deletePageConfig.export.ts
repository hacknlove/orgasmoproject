import strapiFetch from "../strapiFetch";

export default async function deletePageConfig(ctx, pageId) {
  const exactMatch = await strapiFetch(
    `page-configs?filters[pageId][$eq]=${pageId}`
  );

  if (!exactMatch?.data?.[0]?.id) {
    throw new Error("page not found");
  }

  await strapiFetch(`page-configs/${exactMatch.data[0].id}`, {
    method: "DELETE",
  });
}
