import strapiFetch from "../strapiFetch";

async function updateStoryConfig(id, storyConfig) {
  await strapiFetch(`story-configs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { storyConfig } }),
  });
}

async function newStoryConfig(storyConfig) {
  await strapiFetch("story-configs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        filePath: `${storyConfig.itemConfig.type}/${storyConfig.story}`,
        storyConfig,
      },
    }),
  });
}

export default async function upsertStoryConfig(ctx, storyConfig) {
  const exactMatch = await strapiFetch(
    `story-configs?filters[filePath][$eq]=${storyConfig.itemConfig.type}/${storyConfig.story}`
  );

  if (exactMatch?.data?.[0]?.id) {
    await updateStoryConfig(exactMatch.data[0].id, storyConfig);
  } else {
    await newStoryConfig(storyConfig);
  }
}
