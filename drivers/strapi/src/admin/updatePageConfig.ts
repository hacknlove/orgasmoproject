import strapiFetch from "../strapiFetch";

export default async function updatePageConfig(ctx, pageConfig) {
  const exactMatch = await strapiFetch(
    `page-configs?filters[pageId][$eq]=${pageConfig.pageId}`
  );

  const response = await strapiFetch(`page-configs/${exactMatch.data[0].id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: pageConfig }),
  }).catch((error) => ({ error }));

  return response;
}
