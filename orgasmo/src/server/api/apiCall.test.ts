/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import apiCall from "./apiCall";

describe("apiCall", () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      driver: {
        "some.api.path.GET": jest.fn(),
      },
      req: {
        query: {
          _o: [],
        },
      },
      res: {
        json: jest.fn(),
      },
    };
  });
  it("pass it to the driver", async () => {
    ctx.req.method = "GET";
    ctx.req.query._o = ["some", "api", "path"];
    apiCall(ctx);

    expect(ctx.driver["some.api.path.GET"]).toBeCalledWith(ctx.req, ctx.res);
  });
  it("returns not found if there is no handler for the path", async () => {
    ctx.req.method = "POST";
    ctx.req.query._o = ["some", "api", "path"];
    apiCall(ctx);

    expect(ctx.driver["some.api.path.GET"]).not.toBeCalled();
    expect(ctx.res.json).toBeCalledWith({ error: "not found" });
  });
});
