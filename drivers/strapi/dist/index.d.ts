import updatePageConfig from "./admin/updatePageConfig";
import newPageConfig from "./admin/newPageConfig";
import getPageConfig from "./pages/getPageConfig";
import getPageConfigFromId from "./pages/getPageConfigFromId";
declare const filesystemDriver: {
    page: {
        getPageConfig: typeof getPageConfig;
        getPageConfigFromId: typeof getPageConfigFromId;
    };
    admin: {
        updatePageConfig: typeof updatePageConfig;
        newPageConfig: typeof newPageConfig;
    };
    "admin.updatePageConfig": typeof updatePageConfig;
    "admin.newPageConfig": typeof newPageConfig;
    "page.getPageConfig": typeof getPageConfig;
    "page.getPageConfigFromId": typeof getPageConfigFromId;
};
export default filesystemDriver;
