import updatePageConfig from "./admin/updatePageConfig";
import newPageConfig from "./admin/newPageConfig";
import getPageConfig from "./page/getPageConfig";
import getPageConfigFromId from "./page/getPageConfigFromId";
import getAllStories from "./admin/getAllStories";
import updateStoryConfig from "./admin/updateStoryConfig";
import deletePageConfig from "./admin/deletePageConfig";
import deleteStoryConfig from "./admin/deleteStoryConfig";
import getAllPages from "./admin/getAllPages";

const mongoDriver = {
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
    getAllPages,
  },
  "admin.updatePageConfig": updatePageConfig,
  "admin.newPageConfig": newPageConfig,
  "admin.updateStoryConfig": updateStoryConfig,
  "admin.getAllStories": getAllStories,
  "admin.deletePageConfig": deletePageConfig,
  "admin.deleteStoryConfig": deleteStoryConfig,
  "admin.getAllages": getAllPages,
  "page.getPageConfig": getPageConfig,
  "page.getPageConfigFromId": getPageConfigFromId,
};

export default mongoDriver;
