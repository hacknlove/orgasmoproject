/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import cacheRefresh from "./cacheRefresh";
import { autoRefreshInterval, nextRevalidation } from "./maps";

jest.mock("../events", () => ({
  __esModule: true,
  default: {
    emit: jest.fn(),
  },
}));
describe("cacheRefresh", () => {
  let key;
  let item;
  let newItem;
  let ctx;
  beforeEach(() => {
    key = expect.getState().currentTestName;
    item = {
      foo: "foo",
      autoRefresh: {
        method: "somemethod",
        ms: 1000,
      },
    };
    newItem = {
      bar: "bar",
      autoRefresh: {
        method: "somemethod",
        ms: 1000,
      },
    };
    ctx = {
      driver: {
        somemethod: jest.fn(),
      },
      cache: new Map([[key, item]]),
    };
  });
  it("fetch a new item", async () => {
    item.autoRefresh = {
      method: "somemethod",
      ms: 1000,
    };

    ctx.driver.somemethod.mockResolvedValue(newItem);

    await cacheRefresh({ ctx, item, key });

    expect(ctx.cache.get(key)).toEqual(newItem);
  });

  it("expires if no new item is returned", async () => {
    ctx.driver.somemethod.mockResolvedValue(null);

    autoRefreshInterval.set(key, 0);
    await cacheRefresh({ ctx, item, key: key });
    expect(ctx.cache.has(key)).toBeFalsy();
    expect(autoRefreshInterval.has(key)).toBeFalsy();
  });

  it("expires if driver throws", async () => {
    ctx.driver.somemethod.mockRejectedValue("Error");

    autoRefreshInterval.set(key, 0);
    await cacheRefresh({ ctx, item, key });
    expect(ctx.cache.has(key)).toBeFalsy();
    expect(autoRefreshInterval.has(key)).toBeFalsy();
  });

  it("updates the revalidation time, if the item revalidates", async () => {
    newItem.revalidate = {
      ms: 1000,
    };

    ctx.driver.somemethod.mockResolvedValue(newItem);

    await cacheRefresh({ ctx, item, key });
    expect(nextRevalidation.has(key));
  });

  it("changes the autoRefreshInterval if the newItem wants it different ", async () => {
    newItem.autoRefresh = {
      method: "somemethod",
      ms: 2000,
    };

    ctx.driver.somemethod.mockResolvedValue(newItem);

    await cacheRefresh({ ctx, item, key });
    expect(autoRefreshInterval.has(key)).toBe(true);
  });

  it("clears the autoRefreshInterval if the newItem has no autoRefresh", async () => {
    newItem.autoRefresh = null;

    ctx.driver.somemethod.mockResolvedValue(newItem);

    await cacheRefresh({ ctx, item, key });
    expect(autoRefreshInterval.has(key)).toBe(false);
  });
});
