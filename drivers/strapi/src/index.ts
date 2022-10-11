import updatePageConfig from "./admin/updatePageConfig";
import newPageConfig from "./admin/newPageConfig";
import getPageConfig from "./pages/getPageConfig";
import getPageConfigFromId from "./pages/getPageConfigFromId";

const filesystemDriver = {
  page: {
    getPageConfig,
    getPageConfigFromId,
  },
  admin: {
    updatePageConfig,
    newPageConfig,
  },
  "admin.updatePageConfig": updatePageConfig,
  "admin.newPageConfig": newPageConfig,

  "page.getPageConfig": getPageConfig,
  "page.getPageConfigFromId": getPageConfigFromId,
};

export default filesystemDriver;
