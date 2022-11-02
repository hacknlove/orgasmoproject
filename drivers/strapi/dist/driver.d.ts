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
declare const driver: {
    "admin.deletePageConfig": typeof adminーdeletePageConfig;
    "admin.deleteSiteConfig": typeof adminーdeleteSiteConfig;
    "admin.deleteStoryConfig": typeof adminーdeleteStoryConfig;
    "admin.getAllPages": typeof adminーgetAllPages;
    "admin.getAllStories": typeof adminーgetAllStories;
    "admin.getComponentStory": typeof adminーgetComponentStory;
    "admin.savePageConfig": typeof adminーsavePageConfig;
    "admin.saveSiteConfig": typeof adminーsaveSiteConfig;
    "admin.saveStoryConfig": typeof adminーsaveStoryConfig;
    "pages.getPageConfig": typeof pagesーgetPageConfig;
    "pages.getPageConfigFromId": typeof pagesーgetPageConfigFromId;
    "site.getConfig": typeof siteーgetConfig;
};
export default driver;