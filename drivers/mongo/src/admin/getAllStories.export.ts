import mongoProxy from "../mongoProxy";

const storyConfigsCollectionName =
  (process.env.ORGASMO_MONGO_STORIES_COLLECTION as string) ?? "storyConfigs";

export default async function getAllStories() {
  await mongoProxy.connect();

  const storiesArray = await mongoProxy[storyConfigsCollectionName]
    .find({}, { projection: { _id: 0 } })
    .toArray();
  const stories = {};

  for (const storyConfig  of storiesArray) {
    const component = storyConfig.itemConfig.type
    const story = storyConfig.story
    stories[component] ??= {};
    stories[component][story] = storyConfig;
  }

  return stories;
}
