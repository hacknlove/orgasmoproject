/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import getPage from "./getPage";
import sendFullPage from "./sendFullPage";
import getCachedPage from "./getCachedPage";
import getNewFullPage from "./getNewFullPage";

jest.mock("./getCachedPage", () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));
jest.mock("./getNewFullPage", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("./sendFullPage", () => ({
  __esModule: true,
  default: jest.fn(() => "sendFullPageResponse"),
}));
jest.mock("./getCachedPageVariant", () => ({
  __esModule: true,
  default: jest.fn(() => "getCachedPageVariantResponse"),
}));
jest.mock("../events", () => ({
  __esModule: true,
  default: {
    emit: jest.fn(() => ({})),
  },
}));

describe("getPage", () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      setCookies: [],
    };
  });
  it("returns from getNewPage if the page is not cached", async () => {
    await getPage(ctx);

    expect(getNewFullPage).toBeCalled();
  });
  it("returns from sendFullPage if the page is fully cached", async () => {
    getCachedPage.mockResolvedValue({
      key: "something",
      pageConfig: {
        response: "Some response",
      },
    });

    const response = await getPage(ctx);

    expect(response).toBe("sendFullPageResponse");
    expect(sendFullPage).toBeCalled();
  });
  it("returns from getCachedPageVariant if the page is not full cached", async () => {
    getCachedPage.mockResolvedValue({
      key: "something",
      pageConfig: {
        pages: ["some pages"],
      },
    });

    const response = await getPage(ctx);
    expect(response).toBe("getCachedPageVariantResponse");
  });
  it("returns not found and emits an error if the cache is corrupted", async () => {
    getCachedPage.mockResolvedValue({
      key: "something",
      pageConfig: {},
    });

    const response = await getPage(ctx);
    expect(response).toEqual({ notFound: true });
  });
});
