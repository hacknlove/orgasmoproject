import events from "../events";
import getPageCacheKeys from "./getPageCacheKeys";

jest.mock("../events", () => ({
  __esModule: true,
  default: {
    emit: jest.fn(),
  },
}));

describe("getPageCacheKeys", () => {
  const ctx = {
    params: ["foo"],
    req: {
      user: {
        roles: ["test-role"],
      },
    },
    driver: {
      page: {
        allParameterMethods: jest.fn(),
      },
      paramsMethod1(ctx) {
        return {
          p: ctx.params,
        };
      },
      paramsMethod2(ctx) {
        return {
          r: ctx.req.user.roles,
        };
      },
    },
  };

  it("returns an async iterable that yields the response of allParameterMethods serialized + the default params serialized", async () => {
    ctx.driver.page.allParameterMethods.mockResolvedValue([
      "paramsMethod1",
      "paramsMethod2",
    ]);

    const expected = [
      "(Hp_Jfoo",
      "(Hr_Ptest-role",
      "(Mparams_Jfoo.Lroles_Ptest-role",
    ];

    for await (const key of getPageCacheKeys(ctx)) {
      expect(key).toBe(expected.shift());
    }
  });

  it("emits an error if the driver rejects", async () => {
    ctx.driver.page.allParameterMethods.mockRejectedValue("Some Error");

    const expected = ["(Mparams_Jfoo.Lroles_Ptest-role"];

    for await (const key of getPageCacheKeys(ctx)) {
      expect(key).toBe(expected.shift());
    }

    expect(events.emit).toBeCalled();
  });
});
