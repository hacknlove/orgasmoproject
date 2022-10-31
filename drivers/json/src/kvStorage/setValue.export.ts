import { outputJson } from "fs-extra";
import { kvStoragePath } from "../consts";
import { join } from "path";
import parseDirectory, {
  keysToFilePath,
  waitForIt,
} from "../kvStorage/parseDirectory";

export default async function getConfig(ctx, kvStorage) {
  await waitForIt;

  const filePath =
    keysToFilePath[kvStorage.key] ??
    join(process.cwd(), kvStoragePath, `/${kvStorage.key}.json`);

  await outputJson(filePath, kvStorage, { spaces: 2 });

  await parseDirectory();
}
