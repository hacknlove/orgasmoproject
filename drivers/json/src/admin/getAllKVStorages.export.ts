import { waitForIt, kvStorage } from "../kvStorage/parseDirectory";

export default async function getAllKVStorages() {
  await waitForIt;

  return Object.fromEntries(
    Object.entries(kvStorage).map(([key, kvStorage]) => [
      key,
      (kvStorage as any).description,
    ])
  );
}
