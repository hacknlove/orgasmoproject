import strapiFetch from "../strapiFetch";

export default async function getComponentStory({ component, story }) {
  const exactMatch = await strapiFetch(
    `story-configs?filters[filePath][$eq]=${component}/${story}`
  );

  return exactMatch?.data?.[0]?.attributes?.storyConfig;
}
