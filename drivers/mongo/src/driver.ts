import adminーdeletePageConfig from "./admin/deletePageConfig.export";
import adminーdeleteStoryConfig from "./admin/deleteStoryConfig.export";
import adminーgetAllPages from "./admin/getAllPages.export";
import adminーgetAllStories from "./admin/getAllStories.export";
import adminーgetComponentStory from "./admin/getComponentStory.export";
import adminーnewPageConfig from "./admin/newPageConfig.export";
import adminーupdatePageConfig from "./admin/updatePageConfig.export";
import adminーupsertPageConfig from "./admin/upsertPageConfig.export";
import adminーupsertStoryConfig from "./admin/upsertStoryConfig.export";
import pageーgetPageConfig from "./page/getPageConfig.export";
import pageーgetPageConfigFromId from "./page/getPageConfigFromId.export";
import siteーgetConfig from "./site/getConfig.export";

const driver = {
  ["admin.deletePageConfig"]: adminーdeletePageConfig,
  ["admin.deleteStoryConfig"]: adminーdeleteStoryConfig,
  ["admin.getAllPages"]: adminーgetAllPages,
  ["admin.getAllStories"]: adminーgetAllStories,
  ["admin.getComponentStory"]: adminーgetComponentStory,
  ["admin.newPageConfig"]: adminーnewPageConfig,
  ["admin.updatePageConfig"]: adminーupdatePageConfig,
  ["admin.upsertPageConfig"]: adminーupsertPageConfig,
  ["admin.upsertStoryConfig"]: adminーupsertStoryConfig,
  ["page.getPageConfig"]: pageーgetPageConfig,
  ["page.getPageConfigFromId"]: pageーgetPageConfigFromId,
  ["site.getConfig"]: siteーgetConfig,
};

driver["admin"] = {};
driver["admin"]["deletePageConfig"] = adminーdeletePageConfig;
driver["admin"]["deleteStoryConfig"] = adminーdeleteStoryConfig;
driver["admin"]["getAllPages"] = adminーgetAllPages;
driver["admin"]["getAllStories"] = adminーgetAllStories;
driver["admin"]["getComponentStory"] = adminーgetComponentStory;
driver["admin"]["newPageConfig"] = adminーnewPageConfig;
driver["admin"]["updatePageConfig"] = adminーupdatePageConfig;
driver["admin"]["upsertPageConfig"] = adminーupsertPageConfig;
driver["admin"]["upsertStoryConfig"] = adminーupsertStoryConfig;
driver["page"] = {};
driver["page"]["getPageConfig"] = pageーgetPageConfig;
driver["page"]["getPageConfigFromId"] = pageーgetPageConfigFromId;
driver["site"] = {};
driver["site"]["getConfig"] = siteーgetConfig;

export default driver;
