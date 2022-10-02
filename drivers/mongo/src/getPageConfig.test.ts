import mongoProxy from "./mongoProxy";
import getPageConfig from "./getPageConfig";

jest.mock("./mongoProxy", () => ({
  __esModule: true,
  default: {
    connect: jest.fn(),
  },
}));

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
  it("returns the pageConfig if the resolvedPath is a exactPath", async () => {
    findToArray.mockReturnValue(["someStaticPathPageConfig"]);
    expect(await getPageConfig(ctx)).toBe("someStaticPathPageConfig");
  });
  it("returns an array if multiple pageConfiges match the exactPath", async () => {
    findToArray.mockReturnValue(["someStaticPathPageConfig", "someOther"]);
    expect(await getPageConfig(ctx)).toEqual([
      "someStaticPathPageConfig",
      "someOther",
    ]);
  });
  it("returns the pageConfig if the resolvedPath is a patternPath", async () => {
    findToArray.mockReturnValueOnce([]);
    findToArray.mockReturnValue([
      { patternPath: "/not/:this" },
      { patternPath: "/foo/:bar" },
      { patternPath: "/foo/fuu" },
      { patternPath: "/:foo/fuu" },
    ]);
    expect(await getPageConfig(ctx)).toEqual({ patternPath: "/foo/:bar" });
  });
  it("returns an array if there are multiple matches for the same pattern", async () => {
    findToArray.mockReturnValueOnce([]);
    findToArray.mockReturnValue([
      { patternPath: "/not/:this" },
      { patternPath: "/foo/:bar", foo: "foo" },
      { patternPath: "/foo/fuu" },
      { patternPath: "/:foo/fuu" },
      { patternPath: "/foo/:bar", bar: "bar" },
      { patternPath: "/foo/:bar", buz: "buz" },
    ]);
    expect(await getPageConfig(ctx)).toEqual([
      { patternPath: "/foo/:bar", foo: "foo" },
      { patternPath: "/foo/:bar", bar: "bar" },
      { patternPath: "/foo/:bar", buz: "buz" },
    ]);
  });
});
