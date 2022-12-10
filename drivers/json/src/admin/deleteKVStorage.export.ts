import { join } from "path";
import config from "@orgasmo/orgasmo/config";
import { remove } from "fs-extra";
import parseDirectory, {
  keysToFilePath,
  waitForIt,
} from "../kvStorage/parseDirectory";

export default async function deleteKVStorage(ctx, key) {
  await waitForIt;

  const filePath =
    keysToFilePath[key] ??
    join(
      process.cwd(),
      config["drivers.@orgasmo.json.kvStoragePath"],
      `${key}.json`
    );
  await remove(filePath);

  await parseDirectory(config["drivers.@orgasmo.json.kvStoragePath"]);
}
