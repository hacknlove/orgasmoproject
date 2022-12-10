import parseDirectoryComponents, {
  watchStories,
} from "../../admin/parseDirectory";
import parseDirectoryPages, { watchPages } from "../../page/parseDirectory";
import parseKVSTorage, { watchValues } from "../../kvStorage/parseDirectory";
import config from "@orgasmo/orgasmo/config";

export default function start() {
  if (process.env.NODE_ENV === "development") {
    watchPages(config.drivers["@orgasmo"].json.pagesPath);
    watchStories(config.drivers["@orgasmo"].json.storiesPath);
    watchValues(config.drivers["@orgasmo"].json.kvStoragePath);
  }

  return Promise.all([
    parseDirectoryComponents(config.drivers["@orgasmo"].json.storiesPath),
    parseDirectoryPages(config.drivers["@orgasmo"].json.pagesPath),
    parseKVSTorage(config.drivers["@orgasmo"].json.kvStoragePath),
  ]);
}
