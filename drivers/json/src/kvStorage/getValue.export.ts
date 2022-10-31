import { waitForIt, kvStorage } from "../kvStorage/parseDirectory";

export default async function getConfig(ctx, key) {
  await waitForIt;

  return kvStorage[key] ?? {};
}
