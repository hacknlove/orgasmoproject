/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import events from "./events";
import extendContentData from "./extendContextData";

describe("extendContentData", () => {
  it("ads pageConfig.contextData to ctx", async () => {
    const ctx = {};
    const pageConfig = {
      contextData: { foo: "bar" },
    };

    await extendContentData(ctx, null, pageConfig);

    expect(ctx.contextData).toBe(pageConfig.contextData);
  });

  it("initialized contextData as empty object by default", async () => {
    const ctx = {};
    const pageConfig = {};

    await extendContentData(ctx, null, pageConfig);

    expect(ctx.contextData).toEqual({});
  });

  it("accepts one method as a string", async () => {
    const ctx = {
      driver: {
        fooMethod: jest.fn().mockResolvedValue({ bar: "variable" }),
      },
    };
    const pageConfig = {
      contextData: { foo: "bar" },
      getContextData: "fooMethod",
    };

    await extendContentData(ctx, null, pageConfig);

    expect(ctx.contextData).toEqual({
      foo: "bar",
      bar: "variable",
    });
  });

  it("accepts an array of methofs", async () => {
    const ctx = {
      driver: {
        fooMethod: jest.fn().mockResolvedValue({ bar: "variable" }),
      },
    };
    const pageConfig = {
      contextData: { foo: "bar" },
      getContextData: ["fooMethod", "otherMethod"],
    };

    await extendContentData(ctx, null, pageConfig);

    expect(ctx.contextData).toEqual({
      foo: "bar",
      bar: "variable",
    });
  });

  it("emits an event on error", async () => {
    const ctx = {
      driver: {
        fooMethod: jest.fn().mockRejectedValue(),
      },
    };
    const pageConfig = {
      contextData: { foo: "bar" },
      getContextData: "fooMethod",
    };
    const errorListener = jest.fn();
    events.once("error", errorListener);

    await extendContentData(ctx, null, pageConfig);

    expect(ctx.contextData).toEqual({
      foo: "bar",
    });

    expect(errorListener).toBeCalled();
  });
});
