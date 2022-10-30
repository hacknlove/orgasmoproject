import updatePageConfig from "./admin/updatePageConfig";
import newPageConfig from "./admin/newPageConfig";
import getPageConfigFromId from "./pages/getPageConfigFromId";
declare const filesystemDriver: {
    page: {
        getPageConfig: any;
        getPageConfigFromId: typeof getPageConfigFromId;
    };
    admin: {
        updatePageConfig: typeof updatePageConfig;
        newPageConfig: typeof newPageConfig;
    };
    "admin.updatePageConfig": typeof updatePageConfig;
    "admin.newPageConfig": typeof newPageConfig;
    "page.getPageConfig": any;
    "page.getPageConfigFromId": typeof getPageConfigFromId;
};
export default filesystemDriver;
