import mongoProxy from "./mongoProxy";
import getPageConfig from "./getPageConfig";

describe("getPageConfig", () => {
  let ctx;
  let pageConfigs;
  let findToArray;
  beforeEach(() => {
    findToArray = jest.fn(() => []);
    pageConfigs = {
      findOne: jest.fn(),
      find: jest.fn(() => ({
        toArray: () => findToArray(),
      })),
    };

    mongoProxy.pageConfigs = pageConfigs;

    ctx = {
      resolvedUrl: "/foo/bar",
    };
  });

  it("returns undefined if no page matches", async () => {
    expect(await getPageConfig(ctx)).toBeUndefined();
  });
  it("returns the pageConfig if the resolvedPath is a staticPath", async () => {
    pageConfigs.findOne.mockReturnValue("someStaticPathPageConfig");
    expect(await getPageConfig(ctx)).toBe("someStaticPathPageConfig");
  });
  it("returns the pageConfig if the resolvedPath is a dynamicPath", async () => {
    findToArray.mockReturnValue([
      { dynamicPath: "/not/:this" },
      { dynamicPath: "/foo/:bar" },
      { dynamicPath: "/foo/fuu" },
      { dynamicPath: "/:foo/fuu" },
    ]);
    expect(await getPageConfig(ctx)).toEqual({ dynamicPath: "/foo/:bar" });
  });
});
