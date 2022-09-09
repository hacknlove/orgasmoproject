/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import cacheGet from "../cache/cacheGet";
import getCachedPage from "./getCachedPage";
import getPageCacheKeys from "./getPageCacheKeys";

jest.mock("../cache/cacheGet", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("./getPageCacheKeys", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("detCachedPage", () => {
  let ctx;
  beforeEach(() => {
    ctx = {};
  });
  it("gets the keys async generator from getPageCacheKeys and try each", async () => {
    const keys = ["one", "two", "three", "four"];
    getPageCacheKeys.mockResolvedValue(keys);

    expect(await getCachedPage(ctx)).toEqual({});

    expect(cacheGet).toBeCalledTimes(4);
    for (const key of keys) {
      expect(cacheGet).toBeCalledWith({ ctx, key });
    }
  });
  it("gets the keys async generator from getPageCacheKeys and try each until it find the right one", async () => {
    const keys = ["one", "two", "three", "four"];
    getPageCacheKeys.mockResolvedValue(keys);
    cacheGet.mockImplementation(({ key }) => {
      if (key === "three") {
        return "somePageConfigFound";
      }
    });

    expect(await getCachedPage(ctx)).toEqual({
      key: "three",
      pageConfig: "somePageConfigFound",
    });

    expect(cacheGet).toBeCalledTimes(3);
    for (const key of keys) {
      if (key === "four") {
        expect(cacheGet).not.toBeCalledWith({ ctx, key });
      } else {
        expect(cacheGet).toBeCalledWith({ ctx, key });
      }
    }
  });
});
