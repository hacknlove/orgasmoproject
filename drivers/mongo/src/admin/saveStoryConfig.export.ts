import mongoProxy from "../mongoProxy";

const storyConfigsCollectionName =
  (process.env.ORGASMO_MONGO_STORIES_COLLECTION as string) ?? "storyConfigs";

export default async function upsertStoryConfig(ctx, storyConfig) {
  await mongoProxy.waitfor;

  delete storyConfig._id;

  await mongoProxy[storyConfigsCollectionName].updateOne(
    {
      "itemConfig.type": storyConfig.itemConfig.type,
      story: storyConfig.story,
    },
    {
      $set: storyConfig,
    },
    {
      upsert: true,
    }
  );

  return { ok: true };
}
