import mongoProxy from "../mongoProxy";

const storyConfigsCollectionName =
  (process.env.ORGASMO_MONGO_STORIES_COLLECTION as string) ?? "storyConfigs";

export default async function upsertStoryConfig(
  ctx,
  { component, story, ...$set }
) {
  await mongoProxy.connect();

  await mongoProxy[storyConfigsCollectionName].updateOne(
    {
      component,
      story,
    },
    {
      $set,
    },
    {
      upsert: true,
    }
  );

  return { ok: true };
}
