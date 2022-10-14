import mongoProxy from "../mongoProxy";

const storyConfigsCollectionName =
  (process.env.ORGASMO_MONGO_STORIESS_COLLECTION as string) ?? "storyConfigs";

export default async function getAllStories() {
  await mongoProxy.connect();

  const storiesArray = await mongoProxy[storyConfigsCollectionName]
    .find({}, { projection: { _id: 0 } })
    .toArray();
  const stories = {};

  for (const { component, story, ...storyConfig } of storiesArray) {
    stories[component] ??= {};
    stories[component][story] = storyConfig;
  }

  return stories;
}
