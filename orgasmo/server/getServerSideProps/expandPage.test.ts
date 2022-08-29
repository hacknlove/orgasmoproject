/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import expandPage from "./expandPage";
import rewrite from "./rewrite";

jest.mock("./rewrite", () => ({
  __esModule: true,
  default: jest.fn(() => "rewrite response"),
}));

describe("expandPage", () => {
  let ctx;
  let pageConfig;
  let key;
  beforeEach(() => {
    ctx = {
      driver: {},
    };
    pageConfig = {};
    key = "";
  });
  it("redirects if page.redirect", async () => {
    pageConfig.page = {
      redirect: "Somewhere",
    };
    expect(await expandPage({ pageConfig })).toEqual({ redirect: "Somewhere" });
  });
  it("rewrites if page.rewrite", async () => {
    pageConfig.page = {
      rewrite: "Somewhere",
    };

    expect(await expandPage({ ctx, pageConfig, key })).toBe("rewrite response");
    expect(rewrite).toBeCalledWith({ ctx, rewrite: "Somewhere", key });
  });
});
