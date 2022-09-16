import { paths } from "./parseDirectory";
import getPageConfig from "./getPageConfig";

jest.mock("./parseDirectory", () => ({
  __esModule: true,
  waitForIt: Promise.resolve(),
  paths: new Map(),
}));

describe("getPageConfig", () => {
  let ctx;
  beforeEach(() => {
    paths.clear();
    ctx = {
      resolvedUrl: "/foo/bar",
    };
  });
  it("returns undefined if no page matches", async () => {
    paths.set("something", { match: () => undefined, pageConfig: {} });

    expect(await getPageConfig(ctx)).toBeUndefined();
  });
  it("returns the pageConfig if the path matches any key", async () => {
    paths.set("/foo/bar", {
      match: () => {
        throw "should not call this";
      },
      pageConfig: "somePageConfig",
    });

    expect(await getPageConfig(ctx)).toBe("somePageConfig");
  });
});
