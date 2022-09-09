import cacheNewItem from "./cacheNewItem";
import cacheNewAutoRefreshInterval from "./cacheNewAutoRefreshInterval";
import cacheNewExpirationTimeout from "./cacheNewExpirationTimeout";
import { nextRevalidation } from "./maps";

jest.mock("./cacheNewAutoRefreshInterval", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("./cacheNewExpirationTimeout", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("cacheNewItem", () => {
  let key;
  let ctx;
  let item;
  beforeEach(() => {
    key = expect.getState().currentTestName;
    ctx = {
      driver: {},
      cache: new Map(),
    };
    item = {
      timeChunk: {
        revalidate: 100,
        expire: 500,
      },
    };
  });
  it("adds the expiration timeout", () => {
    cacheNewItem({ ctx, item, key });

    expect(cacheNewAutoRefreshInterval).not.toHaveBeenCalled();
    expect(cacheNewExpirationTimeout).toHaveBeenCalled();
    expect(nextRevalidation.has(key)).toBe(false);
  });

  it("adds the autoRefresh interval", () => {
    item.autoRefresh = true;
    cacheNewItem({ ctx, item, key });

    expect(cacheNewAutoRefreshInterval).toHaveBeenCalled();
  });

  it("sets the nextRevalidation timestamp", () => {
    item.revalidate = "method";
    cacheNewItem({ ctx, item, key });

    expect(nextRevalidation.has(key)).toBe(true);
  });
});
