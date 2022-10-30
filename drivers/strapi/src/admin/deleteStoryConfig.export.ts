import strapiFetch from "../strapiFetch";

export default async function deleteStoryConfig(ctx, { component, story }) {
  const exactMatch = await strapiFetch(
    `story-configs?filters[filePath][$eq]=${component}/${story}`
  );

  if (!exactMatch?.data?.[0]?.id) {
    throw new Error("page not found");
  }

  await strapiFetch(`story-configs/${exactMatch.data[0].id}`, {
    method: "DELETE",
  });
}
