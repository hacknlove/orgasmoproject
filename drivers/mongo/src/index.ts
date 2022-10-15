import updatePageConfig from "./admin/updatePageConfig";
import newPageConfig from "./admin/newPageConfig";
import getPageConfig from "./page/getPageConfig";
import getPageConfigFromId from "./page/getPageConfigFromId";
import getAllStories from "./admin/getAllStories";
import updateStoryConfig from "./admin/updateStoryConfig";
import deletePageConfig from "./admin/deletePageConfig";
import deleteStoryConfig from "./admin/deleteStoryConfig";
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
    deletePageConfig,
    deleteStoryConfig,
  },
  "admin.updatePageConfig": updatePageConfig,
  "admin.newPageConfig": newPageConfig,
  "admin.updateStoryConfig": updateStoryConfig,
  "admin.getAllStories": getAllStories,
  "admin.deletePageConfig": deletePageConfig,
  "admin.deleteStoryConfig": deleteStoryConfig,
  "page.getPageConfig": getPageConfig,
  "page.getPageConfigFromId": getPageConfigFromId,
};

export default filesystemDriver;
