import mongoProxy from "./mongoProxy";
import getPageConfig from "./getPageConfig";

describe("getPageConfig", () => {
  let ctx;
  let pageConfigs;
  let findToArray;
  beforeEach(() => {
    findToArray = jest.fn(() => []);
    pageConfigs = {
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
    findToArray.mockReturnValue(["someStaticPathPageConfig"]);
    expect(await getPageConfig(ctx)).toBe("someStaticPathPageConfig");
  });
  it('returns an array if multiple pageConfiges match the staticPath', async () => {
    findToArray.mockReturnValue(["someStaticPathPageConfig", "someOther"]);
    expect(await getPageConfig(ctx)).toEqual(["someStaticPathPageConfig", "someOther"]);
  })
  it("returns the pageConfig if the resolvedPath is a dynamicPath", async () => {
    findToArray.mockReturnValueOnce([])
    findToArray.mockReturnValue([
      { dynamicPath: "/not/:this" },
      { dynamicPath: "/foo/:bar" },
      { dynamicPath: "/foo/fuu" },
      { dynamicPath: "/:foo/fuu" },
    ]);
    expect(await getPageConfig(ctx)).toEqual({ dynamicPath: "/foo/:bar" });
  });
  it("returns an array if there are multiple matches for the same pattern", async () => {
    findToArray.mockReturnValueOnce([])
    findToArray.mockReturnValue([
      { dynamicPath: "/not/:this" },
      { dynamicPath: "/foo/:bar", foo: 'foo' },
      { dynamicPath: "/foo/fuu" },
      { dynamicPath: "/:foo/fuu" },
      { dynamicPath: "/foo/:bar", bar: 'bar' },
      { dynamicPath: "/foo/:bar", buz: 'buz' },
    ]);
    expect(await getPageConfig(ctx)).toEqual([
      { dynamicPath: "/foo/:bar", foo: 'foo' },
      { dynamicPath: "/foo/:bar", bar: 'bar' },
      { dynamicPath: "/foo/:bar", buz: 'buz' },
    ]);
  });
});
