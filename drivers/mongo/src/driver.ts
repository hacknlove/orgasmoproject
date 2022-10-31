import adminーdeleteKVStorage from "./admin/deleteKVStorage.export";
import adminーdeletePageConfig from "./admin/deletePageConfig.export";
import adminーdeleteStoryConfig from "./admin/deleteStoryConfig.export";
import adminーgetAllKVStorages from "./admin/getAllKVStorages.export";
import adminーgetAllPages from "./admin/getAllPages.export";
import adminーgetAllStories from "./admin/getAllStories.export";
import adminーgetComponentStory from "./admin/getComponentStory.export";
import adminーsavePageConfig from "./admin/savePageConfig.export";
import adminーsaveStoryConfig from "./admin/saveStoryConfig.export";
import kvーtorageーgetValue from "./kvStorage/getValue.export";
import kvーtorageーsetValue from "./kvStorage/setValue.export";
import pageーgetPageConfig from "./page/getPageConfig.export";
import pageーgetPageConfigFromId from "./page/getPageConfigFromId.export";

const driver = {
  ["admin.deleteKVStorage"]: adminーdeleteKVStorage,
  ["admin.deletePageConfig"]: adminーdeletePageConfig,
  ["admin.deleteStoryConfig"]: adminーdeleteStoryConfig,
  ["admin.getAllKVStorages"]: adminーgetAllKVStorages,
  ["admin.getAllPages"]: adminーgetAllPages,
  ["admin.getAllStories"]: adminーgetAllStories,
  ["admin.getComponentStory"]: adminーgetComponentStory,
  ["admin.savePageConfig"]: adminーsavePageConfig,
  ["admin.saveStoryConfig"]: adminーsaveStoryConfig,
  ["kvStorage.getValue"]: kvーtorageーgetValue,
  ["kvStorage.setValue"]: kvーtorageーsetValue,
  ["page.getPageConfig"]: pageーgetPageConfig,
  ["page.getPageConfigFromId"]: pageーgetPageConfigFromId,
};

driver["admin"] = {};
driver["admin"]["deleteKVStorage"] = adminーdeleteKVStorage;
driver["admin"]["deletePageConfig"] = adminーdeletePageConfig;
driver["admin"]["deleteStoryConfig"] = adminーdeleteStoryConfig;
driver["admin"]["getAllKVStorages"] = adminーgetAllKVStorages;
driver["admin"]["getAllPages"] = adminーgetAllPages;
driver["admin"]["getAllStories"] = adminーgetAllStories;
driver["admin"]["getComponentStory"] = adminーgetComponentStory;
driver["admin"]["savePageConfig"] = adminーsavePageConfig;
driver["admin"]["saveStoryConfig"] = adminーsaveStoryConfig;
driver["kvStorage"] = {};
driver["kvStorage"]["getValue"] = kvーtorageーgetValue;
driver["kvStorage"]["setValue"] = kvーtorageーsetValue;
driver["page"] = {};
driver["page"]["getPageConfig"] = pageーgetPageConfig;
driver["page"]["getPageConfigFromId"] = pageーgetPageConfigFromId;

export default driver;
