import parseDirectoryComponents, {
  watchStories,
} from "../../admin/parseDirectory";
import parseDirectoryPages, { watchPages } from "../../page/parseDirectory";
import parseKVSTorage, { watchValues } from "../../kvStorage/parseDirectory";

export default function start({ config }) {
  if (process.env.NODE_ENV === "development") {
    watchPages(config.pagesPath);
    watchStories(config.storiesPath);
    watchValues(config.kvStoragePath);
  }

  return Promise.all([
    parseDirectoryComponents(config.storiesPath),
    parseDirectoryPages(config.pagesPath),
    parseKVSTorage(config.kvStoragePath),
  ]);
}
