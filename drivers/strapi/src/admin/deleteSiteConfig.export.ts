import strapiFetch from "../strapiFetch";

export default async function deleteStoryConfig() {
  const exactMatch = await strapiFetch(`site-configs?pagination[pageSize]=1`);

  if (!exactMatch?.data?.[0]?.id) {
    throw new Error("page not found");
  }

  await strapiFetch(`site-configs/${exactMatch.data[0].id}`, {
    method: "DELETE",
  });
}
