import updatePageConfig from "./admin/updatePageConfig";
import newPageConfig from "./admin/newPageConfig";
import getPageConfig from "./page/getPageConfig";
import getPageConfigFromId from "./page/getPageConfigFromId";

const filesystemDriver = {
  page: {
    getPageConfig,
    getPageConfigFromId,
    updatePageConfig,
    newPageConfig,
  },
  "admin.updatePageConfig": updatePageConfig,
  "admin.newPageConfig": newPageConfig,
  "page.getPageConfig": getPageConfig,
  "page.getPageConfigFromId": getPageConfigFromId,
};

export default filesystemDriver;
