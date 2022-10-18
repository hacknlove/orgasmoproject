import updatePageConfig from "./admin/updatePageConfig";
import upsertPageConfig from "./admin/upsertPageConfig";
import newPageConfig from "./admin/newPageConfig";
import getPageConfig from "./page/getPageConfig";
import getPageConfigFromId from "./page/getPageConfigFromId";
import getAllStories from "./admin/getAllStories";
import upsertStoryConfig from "./admin/upsertStoryConfig";
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
    upsertPageConfig,
    newPageConfig,
    upsertStoryConfig,
    getAllStories,
    deletePageConfig,
    deleteStoryConfig,
    getAllPages,
  },
  "admin.updatePageConfig": updatePageConfig,
  "admin.upsertPageConfig": upsertPageConfig,
  "admin.newPageConfig": newPageConfig,
  "admin.upsertStoryConfig": upsertStoryConfig,
  "admin.getAllStories": getAllStories,
  "admin.deletePageConfig": deletePageConfig,
  "admin.deleteStoryConfig": deleteStoryConfig,
  "admin.getAllages": getAllPages,
  "page.getPageConfig": getPageConfig,
  "page.getPageConfigFromId": getPageConfigFromId,
};

export default mongoDriver;
