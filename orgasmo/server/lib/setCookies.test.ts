/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import nookies from "nookies";

import setCookies from "./setCookies";

jest.mock("nookies", () => {
  return {
    default: {
      set: jest.fn(),
      get: jest.fn(),
      remove: jest.fn(),
    },
  };
});

describe("setCookies", () => {
  const ctx = { setCookies: [] };
  it("does nothing is no cookies there", () => {
    setCookies({ ctx });
    expect(nookies.set).not.toHaveBeenCalled();
  });

  it("does nothing is cookies is an empty array", () => {
    setCookies({ cookies: [], ctx });
    expect(nookies.set).not.toHaveBeenCalled();
  });

  it("calls nookies.set once per each cookie in the cookies array", () => {
    setCookies({
      cookies: [
        {
          name: "test-name",
          value: "test-value",
          options: {},
        },
        {
          name: "test-name-2",
          value: "test-value-2",
          options: {},
        },
      ],
      ctx,
    });

    expect(nookies.set).toHaveBeenCalledTimes(2);
    // @ts-ignore
    expect(nookies.set.mock.calls[0]).toEqual([
      ctx,
      "test-name",
      "test-value",
      {},
    ]);
    // @ts-ignore
    expect(nookies.set.mock.calls[1]).toEqual([
      ctx,
      "test-name-2",
      "test-value-2",
      {},
    ]);
  });
});
