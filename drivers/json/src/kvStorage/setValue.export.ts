import { outputJson } from "fs-extra";
import { join } from "path";
import parseDirectory, {
  keysToFilePath,
  waitForIt,
} from "../kvStorage/parseDirectory";

import config from "@orgasmo/orgasmo/config";

export default async function getConfig(ctx, kvStorage) {
  const kvStoragePath = config["driver.@orgasmo.json"];

  await waitForIt;

  const filePath =
    keysToFilePath[kvStorage.key] ??
    join(process.cwd(), kvStoragePath, `/${kvStorage.key}.json`);

  await outputJson(filePath, kvStorage, { spaces: 2 });

  await parseDirectory(ctx.driver["@orgasmo"].json.kvStoragePathPath);
}
