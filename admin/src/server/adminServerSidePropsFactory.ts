import { cleanAwaitJson } from "@orgasmo/orgasmo/cleanJson";

export default function adminServerSidePropsFactory({ driver }) {
  return async (ctx) => {
    ctx.resolvedUrl =
      ctx.resolvedUrl.substring("/admin".length).replace(/\?.*$/, "") || "/";
    const adminConfig = cleanAwaitJson(
      driver.page.getPageConfigFromId("_oadmin")
    );
    return {
      props: {
        pageConfig: await cleanAwaitJson(driver.page.getPageConfig(ctx)),
        adminAreas: (await adminConfig).areas,
        driverMethods: Object.keys(driver).filter((method) =>
          method.includes(".")
        ),
        resolvedUrl: ctx.resolvedUrl,
      },
    };
  };
}
