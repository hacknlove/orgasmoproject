import { join } from "path";
import { kvStoragePath } from "../consts";
import { remove } from "fs-extra";
import parseDirectory, {
  keysToFilePath,
  waitForIt,
} from "../kvStorage/parseDirectory";

export default async function deleteKVStorage(ctx, key) {
  await waitForIt;

  const filePath =
    keysToFilePath[key] ?? join(process.cwd(), kvStoragePath, `${key}.json`);
  await remove(filePath);

  await parseDirectory();
}
