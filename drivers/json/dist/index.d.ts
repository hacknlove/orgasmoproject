import notPossible from "./admin/notPossible";
import getPageConfig from "./page/getPageConfig.export";
import getPageConfigFromId from "./page/getPageConfigFromId.export";
import getAllStories from "./admin/getAllStories.export";
declare const filesystemDriver: {
    page: {
        getPageConfig: typeof getPageConfig;
        getPageConfigFromId: typeof getPageConfigFromId;
    };
    admin: {
        updatePageConfig: typeof notPossible;
        newPageConfig: typeof notPossible;
        upsertStoryConfig: typeof notPossible;
        newStoryConfig: typeof notPossible;
        deletePageConfig: typeof notPossible;
        deleteStoryConfig: typeof notPossible;
        getAllStories: typeof getAllStories;
    };
    "page.getPageConfig": typeof getPageConfig;
    "page.getPageConfigFromId": typeof getPageConfigFromId;
    "admin.updatePageConfig": typeof notPossible;
    "admin.newPageConfig": typeof notPossible;
    "admin.upsertStoryConfig": typeof notPossible;
    "admin.newStoryConfig": typeof notPossible;
    "admin.getAllStories": typeof getAllStories;
    "admin.deletePageConfig": typeof notPossible;
    "admin.deleteStoryConfig": typeof notPossible;
};
export default filesystemDriver;
