
import adminーdeletePageConfig from "./admin/deletePageConfig.export";
import adminーdeleteSiteConfig from "./admin/deleteSiteConfig.export";
import adminーdeleteStoryConfig from "./admin/deleteStoryConfig.export";
import adminーgetAllPages from "./admin/getAllPages.export";
import adminーgetAllStories from "./admin/getAllStories.export";
import adminーgetComponentStory from "./admin/getComponentStory.export";
import adminーsavePageConfig from "./admin/savePageConfig.export";
import adminーsaveSiteConfig from "./admin/saveSiteConfig.export";
import adminーsaveStoryConfig from "./admin/saveStoryConfig.export";
import pagesーgetPageConfig from "./pages/getPageConfig.export";
import pagesーgetPageConfigFromId from "./pages/getPageConfigFromId.export";
import siteーgetConfig from "./site/getConfig.export";



const driver = {
  ["admin.deletePageConfig"]: adminーdeletePageConfig,
  ["admin.deleteSiteConfig"]: adminーdeleteSiteConfig,
  ["admin.deleteStoryConfig"]: adminーdeleteStoryConfig,
  ["admin.getAllPages"]: adminーgetAllPages,
  ["admin.getAllStories"]: adminーgetAllStories,
  ["admin.getComponentStory"]: adminーgetComponentStory,
  ["admin.savePageConfig"]: adminーsavePageConfig,
  ["admin.saveSiteConfig"]: adminーsaveSiteConfig,
  ["admin.saveStoryConfig"]: adminーsaveStoryConfig,
  ["pages.getPageConfig"]: pagesーgetPageConfig,
  ["pages.getPageConfigFromId"]: pagesーgetPageConfigFromId,
  ["site.getConfig"]: siteーgetConfig,
}

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
driver["pages"] = {};
driver["pages"]["getPageConfig"] = pagesーgetPageConfig;
driver["pages"]["getPageConfigFromId"] = pagesーgetPageConfigFromId;
driver["site"] = {};
driver["site"]["getConfig"] = siteーgetConfig;

export default driver;
