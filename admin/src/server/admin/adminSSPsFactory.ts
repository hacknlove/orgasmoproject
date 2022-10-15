import { cleanAwaitJson } from "@orgasmo/orgasmo/cleanJson";

export default function adminServerSidePropsFactory({ driver }) {
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

    const adminConfig = cleanAwaitJson(
      driver.page.getPageConfigFromId("_oadmin")
    );
    let pageConfigs = await cleanAwaitJson(driver.page.getPageConfig(ctx));

    if (!Array.isArray(pageConfigs)) {
      pageConfigs = [pageConfigs];
    }

    return {
      props: {
        pageConfigs: Object.fromEntries(
          pageConfigs.map((pageConfig) => [pageConfig.pageId, pageConfig])
        ),
        adminPageConfig: await adminConfig,
        driverMethods: Object.keys(driver).filter((method) =>
          method.includes(".")
        ),
        resolvedUrl: ctx.resolvedUrl,
      },
    };
  };
}
