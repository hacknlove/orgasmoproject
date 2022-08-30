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
    key = "(Mparams_Jfoo.Lroles_Ptest-role";
  });
  it("redirects if page.redirect", async () => {
    pageConfig.redirect = "Somewhere";
    expect(await expandPage({ pageConfig })).toEqual({ redirect: "Somewhere" });
  });
  it("rewrites if page.rewrite", async () => {
    pageConfig.rewrite = "Somewhere";

    expect(await expandPage({ ctx, pageConfig, key })).toBe("rewrite response");
    expect(rewrite).toBeCalledWith({ ctx, rewrite: "Somewhere", key });
  });
});
