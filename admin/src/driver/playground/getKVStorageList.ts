export default async function getKVStorageList({ driver }) {
  return (await driver?.admin?.getAllKVStorages?.()?.catch(() => ({}))) || {};
}
