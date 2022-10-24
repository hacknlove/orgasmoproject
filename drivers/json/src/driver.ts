import ーorgasmoーjsonーstart from "./@orgasmo/json/start.export";
import adminーdeletePageConfig from "./admin/deletePageConfig.export";
import adminーdeleteSiteConfig from "./admin/deleteSiteConfig.export";
import adminーdeleteStoryConfig from "./admin/deleteStoryConfig.export";
import adminーgetAllPages from "./admin/getAllPages.export";
import adminーgetAllStories from "./admin/getAllStories.export";
import adminーgetComponentStory from "./admin/getComponentStory.export";
import adminーsavePageConfig from "./admin/savePageConfig.export";
import adminーsaveSiteConfig from "./admin/saveSiteConfig.export";
import adminーsaveStoryConfig from "./admin/saveStoryConfig.export";
import pageーgetPageConfig from "./page/getPageConfig.export";
import pageーgetPageConfigFromId from "./page/getPageConfigFromId.export";
import siteーgetConfig from "./site/getConfig.export";

const driver = {
  ["@orgasmo.json.start"]: ーorgasmoーjsonーstart,
  ["admin.deletePageConfig"]: adminーdeletePageConfig,
  ["admin.deleteSiteConfig"]: adminーdeleteSiteConfig,
  ["admin.deleteStoryConfig"]: adminーdeleteStoryConfig,
  ["admin.getAllPages"]: adminーgetAllPages,
  ["admin.getAllStories"]: adminーgetAllStories,
  ["admin.getComponentStory"]: adminーgetComponentStory,
  ["admin.savePageConfig"]: adminーsavePageConfig,
  ["admin.saveSiteConfig"]: adminーsaveSiteConfig,
  ["admin.saveStoryConfig"]: adminーsaveStoryConfig,
  ["page.getPageConfig"]: pageーgetPageConfig,
  ["page.getPageConfigFromId"]: pageーgetPageConfigFromId,
  ["site.getConfig"]: siteーgetConfig,
};

driver["@orgasmo"] = {};
driver["@orgasmo"]["json"] = {};
driver["@orgasmo"]["json"]["start"] = ーorgasmoーjsonーstart;
driver["admin"] = {};
driver["admin"]["deletePageConfig"] = adminーdeletePageConfig;
driver["admin"]["deleteSiteConfig"] = adminーdeleteSiteConfig;
driver["admin"]["deleteStoryConfig"] = adminーdeleteStoryConfig;
driver["admin"]["getAllPages"] = adminーgetAllPages;
driver["admin"]["getAllStories"] = adminーgetAllStories;
driver["admin"]["getComponentStory"] = adminーgetComponentStory;
driver["admin"]["savePageConfig"] = adminーsavePageConfig;
driver["admin"]["saveSiteConfig"] = adminーsaveSiteConfig;
driver["admin"]["saveStoryConfig"] = adminーsaveStoryConfig;
driver["page"] = {};
driver["page"]["getPageConfig"] = pageーgetPageConfig;
driver["page"]["getPageConfigFromId"] = pageーgetPageConfigFromId;
driver["site"] = {};
driver["site"]["getConfig"] = siteーgetConfig;

export default driver;
