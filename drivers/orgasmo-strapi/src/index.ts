import parseDirectory from "./parseDirectory";

parseDirectory(
  process.env.FILESYSTEM_DATA_PATH ?? "drivers/orgasmo-filesystem/data/pages"
);

import getPageConfig from "./getPageConfig";
import getPageConfigFromId from "./getPageConfigFromId";

const filesystemDriver = {
  page: {
    getPageConfig,
    getPageConfigFromId,
  },
  "page.getPageConfig": getPageConfig,
  "page.getPageConfigFromId": getPageConfigFromId,
};

export default filesystemDriver;
