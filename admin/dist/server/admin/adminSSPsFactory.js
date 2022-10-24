"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleanJson_1 = require("@orgasmo/orgasmo/cleanJson");
function adminServerSidePropsFactory({ driver }) {
    return async (ctx) => {
        if (ctx.resolvedUrl.startsWith("/admin/_back?to=")) {
            return {
                props: {
                    to: ctx.query.to,
                },
            };
        }
        ctx.resolvedUrl =
            ctx.resolvedUrl.substring("/admin".length).replace(/\?.*$/, "") || "/";
        const adminConfig = (0, cleanJson_1.cleanAwaitJson)(driver.page.getPageConfigFromId("_oadmin"));
        let pageConfigs = await (0, cleanJson_1.cleanAwaitJson)(driver.page.getPageConfig(ctx));
        if (!Array.isArray(pageConfigs)) {
            pageConfigs = [pageConfigs];
        }
        return {
            props: {
                pageConfigs: Object.fromEntries(pageConfigs.map((pageConfig) => [pageConfig.pageId, pageConfig])),
                adminPageConfig: await adminConfig,
                driverMethods: Object.keys(driver).filter((method) => method.includes(".")),
                resolvedUrl: ctx.resolvedUrl,
            },
        };
    };
}
exports.default = adminServerSidePropsFactory;
//# sourceMappingURL=adminSSPsFactory.js.map