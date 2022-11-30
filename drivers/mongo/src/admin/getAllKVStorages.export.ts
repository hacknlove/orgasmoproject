import mongoProxy from "../mongoProxy";

const KVStorageCollectionName =
  (process.env.ORGASMO_MONGO_KVSTORAGE_COLLECTION as string) ?? "kvStorage";

export default async function getAllKVStorages() {
  await mongoProxy.waitfor;

  const storiesArray = await mongoProxy[KVStorageCollectionName].find(
    {},
    { projection: { _id: 0 } }
  ).toArray();

  return Object.fromEntries(
    storiesArray.map(({ key, description }) => [key, description])
  );
}
