import mongoProxy from "../mongoProxy";

const storyConfigsCollectionName =
  (process.env.ORGASMO_MONGO_STORIES_COLLECTION as string) ?? "storyConfigs";

export default async function deleteStoryConfig(ctx, { component, story }) {
  await mongoProxy.connect();

  await mongoProxy[storyConfigsCollectionName].deleteOne({
    "itemConfig.type": component,
    story,
  });

  return true;
}
