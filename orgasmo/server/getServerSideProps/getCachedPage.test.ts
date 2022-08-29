jest.mock("../cache/cacheGet", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("./getPageCacheKeys", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("detCachedPage", () => {
  it("gets the keys async generator from getPageCacheKeys", async () =>
    undefined);
});
