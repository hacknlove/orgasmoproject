import cacheRevalidate from "./cacheRevalidate";
import { autoRefreshInterval } from "./maps";
import events from "../events";
import cacheExtendExpirationTimeout from "./cacheExtendExpirationTimeout";

jest.mock("../events", () => ({
  __esModule: true,
  default: {
    emit: jest.fn(),
  },
}));
jest.mock("./cacheExtendExpirationTimeout", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("cacheRevalidate", () => {
  let key;
  let ctx;
  let item;
  let newItem;
  beforeEach(() => {
    key = expect.getState().currentTestName;
    item = { revalidate: "foo" };
    newItem = {};
    ctx = {
      driver: {
        foo: () => newItem,
      },
      cache: new Map([[key, item]]),
    };
  });
  it("does nothing if the method fails", async () => {
    ctx.driver.foo = () => Promise.reject("error");
    await cacheRevalidate({ ctx, key, item });

    expect(events.emit).toHaveBeenCalled();

    expect(ctx.cache.has(key)).toBe(true);
  });
  it("does nothing if the method returns falsy", async () => {
    ctx.driver.foo = () => null;

    await cacheRevalidate({ ctx, key, item });

    expect(ctx.cache.has(key)).toBe(true);
  });
  it("caches the item", async () => {
    await cacheRevalidate({ ctx, key, item });

    expect(ctx.cache.get(key)).toEqual(newItem);
  });
  it("updates the revalidate and expire times", async () => {
    newItem.timeChunk = {
      revalidate: 500,
      expire: 1000,
    };
    newItem.revalidate = "fuu";
    await cacheRevalidate({ ctx, key, item });
    expect(cacheExtendExpirationTimeout).toHaveBeenCalled();
    expect(ctx.cache.get(key)).toEqual(newItem);
  });
  it("sets the autoRefresh", async () => {
    newItem.autoRefresh = {
      method: "fii",
      ms: 1234,
    };

    await cacheRevalidate({ ctx, key, item });

    expect(autoRefreshInterval.has(key)).toBe(true);
  });
});
