import cacheNewAutoRefreshInterval from "./cacheNewAutoRefreshInterval";
import { autoRefreshInterval } from "./maps";
import cacheRefresh from "./cacheRefresh";

jest.mock("./cacheRefresh", () => ({
  _esModule: true,
  default: jest.fn(),
}));

describe("newAutoRefreshInterval", () => {
  const cache = new Map();

  it("sets an interval", async () => {
    const key = expect.getState().currentTestName;
    cacheNewAutoRefreshInterval({
      ctx: {
        cache,
        driver: {
          "someAutorefresh.method": () => undefined,
        },
      },
      key,
      item: {
        autoRefresh: {
          method: "someAutorefresh.method",
          ms: 10,
        },
      },
    });

    expect(autoRefreshInterval.has(key)).toBeTruthy();
    expect(cacheRefresh).not.toBeCalled();
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(cacheRefresh).toBeCalled();
  });
});
