import { expireTimeout } from "./maps";
import cacheExtendExpirationTimeout from "./cacheExtendExpirationTimeout";
import cacheNewExpirationTimeout from "./cacheNewExpirationTimeout";

jest.mock("./cacheNewExpirationTimeout", () => ({
  _esModule: true,
  default: jest.fn(),
}));

describe("cacheExtendExpirationTimeout", () => {
  let key;
  let cache;
  let item = {};
  beforeEach(() => {
    key = expect.getState().currentTestName;
    cache = new Map();
  });
  it("does nothing if there is no expiration to extend", () => {
    cacheExtendExpirationTimeout({ key, cache, item });
    expect(cacheNewExpirationTimeout).not.toHaveBeenCalled();
  });

  it("clears old expiration and sets a new one", async () => {
    const currentTimeout = setTimeout(() => {
      throw new Error("this should have been canceled");
    }, 10) as unknown as number;

    expireTimeout.set(key, currentTimeout);

    cacheExtendExpirationTimeout({ key, cache, item });
    expect(cacheNewExpirationTimeout).toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(true).toBe(true);
  });
});
