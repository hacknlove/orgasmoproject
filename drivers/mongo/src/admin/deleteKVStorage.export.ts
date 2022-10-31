import mongoProxy from "../mongoProxy";

const KVStorageCollectionName =
  (process.env.ORGASMO_MONGO_KVSTORAGE_COLLECTION as string) ?? "kvStorage";

export default async function deleteKVStorage() {
  await mongoProxy.connect();

  await mongoProxy[KVStorageCollectionName].deleteOne({});
}
