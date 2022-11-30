import mongoProxy from "../mongoProxy";

const storyConfigsCollectionName =
  (process.env.ORGASMO_MONGO_STORIES_COLLECTION as string) ?? "storyConfigs";

export default async function getComponentStory({ component, story }) {
  await mongoProxy.waitfor;

  return mongoProxy[storyConfigsCollectionName].findOne({
    story,
    "itemConfig.type": component,
  });
}
