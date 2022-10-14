import updatePageConfig from "./admin/updatePageConfig";
import newPageConfig from "./admin/newPageConfig";
import getPageConfig from "./page/getPageConfig";
import getPageConfigFromId from "./page/getPageConfigFromId";
import getAllStories from "./admin/getAllStories";
import updateStoryConfig from "./admin/updateStoryConfig";

const filesystemDriver = {
  page: {
    getPageConfig,
    getPageConfigFromId,
  },
  admin: {
    updatePageConfig,
    newPageConfig,
    updateStoryConfig,
    getAllStories,
  },
  "admin.updatePageConfig": updatePageConfig,
  "admin.newPageConfig": newPageConfig,
  "admin.updateStoryConfig": updateStoryConfig,
  "admin.getAllStories": getAllStories,
  "page.getPageConfig": getPageConfig,
  "page.getPageConfigFromId": getPageConfigFromId,
};

export default filesystemDriver;
