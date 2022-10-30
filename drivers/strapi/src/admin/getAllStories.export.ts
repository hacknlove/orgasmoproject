import strapiFetch from "../strapiFetch";

export default async function getAllStories() {
  const stories = {};

  let page = 1;
  while (true) {
    const storiesArray = await strapiFetch(
      `story-configs?pagination[page]=${page}`
    );

    for (const storyConfig of storiesArray.data) {
      const component = storyConfig.attributes.itemConfig.type;
      const story = storyConfig.attributes.story;
      stories[component] ??= {};
      stories[component][story] = storyConfig.attributes.description ?? "";
    }
    if (page >= storiesArray.meta.pageCount) {
      break;
    }
    page++;
  }
  return stories;
}
