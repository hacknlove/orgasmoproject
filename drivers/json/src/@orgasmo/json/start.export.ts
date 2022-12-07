import parseDirectoryComponents, {
  watchStories,
} from "../../admin/parseDirectory";
import parseDirectoryPages, { watchPages } from "../../page/parseDirectory";
import parseKVSTorage, { watchValues } from "../../kvStorage/parseDirectory";
import config from "@orgasmo/orgasmo/config";

export default function start() {
  if (process.env.NODE_ENV === "development") {
    watchPages(config.driver["@orgasmo"].json.pagesPath);
    watchStories(config.driver["@orgasmo"].json.storiesPath);
    watchValues(config.driver["@orgasmo"].json.kvStoragePath);
  }

  return Promise.all([
    parseDirectoryComponents(config.driver["@orgasmo"].json.storiesPath),
    parseDirectoryPages(config.driver["@orgasmo"].json.pagesPath),
    parseKVSTorage(config.driver["@orgasmo"].json.kvStoragePath),
  ]);
}
