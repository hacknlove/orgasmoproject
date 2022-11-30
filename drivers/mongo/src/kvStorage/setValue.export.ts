import mongoProxy from "../mongoProxy";

const kvStorageCollectionName =
  (process.env.ORGASMO_MONGO_SITE_COLLECTION as string) ?? "kvStorage";

export default async function getConfig(ctx, key, value) {
  await mongoProxy.waitfor;

  await mongoProxy[kvStorageCollectionName].updateOne(
    { key },
    {
      $set: value,
    },
    {
      upsert: true,
    }
  );
}
