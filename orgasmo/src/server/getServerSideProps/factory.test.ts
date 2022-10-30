/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import getServerSidePropsFactory from "./factory";

import getPage from "./getPage";

jest.mock("./getPage", () => ({
  __esModule: true,
  default: jest.fn(() => "result"),
}));

describe("getServerSidePropsFactory", () => {
  it("calls getPage", async () => {
    const driver = {};
    const ctx = {
      req: {},
      resolvedUrl: "",
    };

    const result = await getServerSidePropsFactory({ driver })(ctx);

    expect(result).toBe("result");
    expect(getPage).toHaveBeenCalledWith(ctx);
  });

  it("allows the driver to override getProps", async () => {
    const driver = {
      "some.url.getServerSideProps": jest.fn(() => "other result"),
    };
    const ctx = {
      req: {},
      resolvedUrl: "/some/url",
    };

    const result = await getServerSidePropsFactory({ driver })(ctx);

    expect(result).toBe("other result");

    expect(getPage).not.toHaveBeenCalled();
    expect(driver["some.url.getServerSideProps"]).toHaveBeenCalledWith(ctx);
  });
});
