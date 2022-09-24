import { dynamicPaths, staticPaths } from "./parseDirectory";
import getPageConfig from "./getPageConfig";

jest.mock("./parseDirectory", () => ({
  __esModule: true,
  waitForIt: Promise.resolve(),
  dynamicPaths: new Map(),
  staticPaths: new Map(),
}));

describe("getPageConfig", () => {
  let ctx;
  beforeEach(() => {
    dynamicPaths.clear();
    staticPaths.clear();
    ctx = {
      resolvedUrl: "/foo/bar",
    };
  });
  it("returns undefined if no page matches", async () => {
    dynamicPaths.set("something", { match: () => undefined, pageConfig: {} });

    expect(await getPageConfig(ctx)).toBeUndefined();
  });
  it("returns the pageConfig if the path matches a staticPath", async () => {
    staticPaths.set("/foo/bar", "somePageConfig");

    expect(await getPageConfig(ctx)).toBe("somePageConfig");
  });
  it("returns the pageConfig if the path matches a dynamicPath", async () => {
    dynamicPaths.set("/foo/:bar", {
      match: () => true,
      pageConfig: "somePageConfig",
    });

    expect(await getPageConfig(ctx)).toBe("somePageConfig");
  });
  it("returns the pageConfig if the path matches a route", async () => {
    dynamicPaths.set("/nop", {
      match: () => null,
      pageConfig: "notThins",
    });
    dynamicPaths.set("/sip", {
      match: () => ({ params: "someParams" }),
      pageConfig: "somePageConfig",
    });

    expect(await getPageConfig(ctx)).toBe("somePageConfig");
    expect(ctx.parsedPath).toBe("someParams");
  });
});
