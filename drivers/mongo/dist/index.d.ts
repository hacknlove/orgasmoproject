import getPageConfig from "./page/getPageConfig.export";
declare const mongoDriver: {
    page: {
        getPageConfig: typeof getPageConfig;
        getPageConfigFromId: any;
    };
    admin: {
        updatePageConfig: any;
        upsertPageConfig: any;
        newPageConfig: any;
        upsertStoryConfig: any;
        getAllStories: any;
        deletePageConfig: any;
        deleteStoryConfig: any;
        getAllPages: any;
    };
    "admin.updatePageConfig": any;
    "admin.upsertPageConfig": any;
    "admin.newPageConfig": any;
    "admin.upsertStoryConfig": any;
    "admin.getAllStories": any;
    "admin.deletePageConfig": any;
    "admin.deleteStoryConfig": any;
    "admin.getAllages": any;
    "page.getPageConfig": typeof getPageConfig;
    "page.getPageConfigFromId": any;
};
export default mongoDriver;
