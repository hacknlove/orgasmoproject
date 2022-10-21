import ーorgasmoーjsonーstart from "./@orgasmo/json/start.export";
import adminーdeletePageConfig from "./admin/deletePageConfig.export";
import adminーdeleteStoryConfig from "./admin/deleteStoryConfig.export";
import adminーgetAllPages from "./admin/getAllPages.export";
import adminーgetAllStories from "./admin/getAllStories.export";
import adminーnewPageConfig from "./admin/newPageConfig.export";
import adminーnewStoryConfig from "./admin/newStoryConfig.export";
import adminーupdatePageConfig from "./admin/updatePageConfig.export";
import adminーupsertStoryConfig from "./admin/upsertStoryConfig.export";
import pageーgetPageConfig from "./page/getPageConfig.export";
import pageーgetPageConfigFromId from "./page/getPageConfigFromId.export";

const driver = {
  ["@orgasmo.json.start"]: ーorgasmoーjsonーstart,
  ["admin.deletePageConfig"]: adminーdeletePageConfig,
  ["admin.deleteStoryConfig"]: adminーdeleteStoryConfig,
  ["admin.getAllPages"]: adminーgetAllPages,
  ["admin.getAllStories"]: adminーgetAllStories,
  ["admin.newPageConfig"]: adminーnewPageConfig,
  ["admin.newStoryConfig"]: adminーnewStoryConfig,
  ["admin.updatePageConfig"]: adminーupdatePageConfig,
  ["admin.upsertStoryConfig"]: adminーupsertStoryConfig,
  ["page.getPageConfig"]: pageーgetPageConfig,
  ["page.getPageConfigFromId"]: pageーgetPageConfigFromId,
};

driver["@orgasmo"] = {};
driver["@orgasmo"]["json"] = {};
driver["@orgasmo"]["json"]["start"] = ーorgasmoーjsonーstart;
driver["admin"] = {};
driver["admin"]["deletePageConfig"] = adminーdeletePageConfig;
driver["admin"]["deleteStoryConfig"] = adminーdeleteStoryConfig;
driver["admin"]["getAllPages"] = adminーgetAllPages;
driver["admin"]["getAllStories"] = adminーgetAllStories;
driver["admin"]["newPageConfig"] = adminーnewPageConfig;
driver["admin"]["newStoryConfig"] = adminーnewStoryConfig;
driver["admin"]["updatePageConfig"] = adminーupdatePageConfig;
driver["admin"]["upsertStoryConfig"] = adminーupsertStoryConfig;
driver["page"] = {};
driver["page"]["getPageConfig"] = pageーgetPageConfig;
driver["page"]["getPageConfigFromId"] = pageーgetPageConfigFromId;

export default driver;
