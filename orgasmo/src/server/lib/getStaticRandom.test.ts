/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import getStaticRandom from "./getStaticRandom";
import nookies from "nookies";

jest.mock("nookies", () => {
  return {
    default: {
      get: jest.fn(),
      set: jest.fn(),
    },
  };
});

describe("getStaticRandom", () => {
  it("returns the user staticRandom if exists", () => {
    const ctx = {
      req: {
        user: {
          staticRandom: 0.5,
        },
      },
    };
    const random = getStaticRandom(ctx);

    expect(random).toBe(0.5);
    expect(nookies.get).not.toHaveBeenCalled();
    expect(nookies.set).not.toHaveBeenCalled();
  });
  it("returns 0 is user.staticRandom is 0", () => {
    const ctx = {
      req: {
        user: {
          staticRandom: 0,
        },
      },
    };
    const random = getStaticRandom(ctx);

    expect(random).toBe(0);
    expect(nookies.get).not.toHaveBeenCalled();
    expect(nookies.set).not.toHaveBeenCalled();
  });
  it("returns staticRandom from the cookie if exists", () => {
    nookies.get.mockReturnValue({ o_sr: "0.42" });

    const ctx = { req: { user: {} } };
    const random = getStaticRandom(ctx);

    expect(random).toBe(0.42);
    expect(nookies.get).toHaveBeenCalledWith(ctx);
    expect(nookies.set).not.toHaveBeenCalled();
  });
  it("returns a random number if no cookie exists, and stores it as a cookie", () => {
    nookies.get.mockReturnValue({});

    const ctx = { req: { user: {} } };
    const random = getStaticRandom(ctx);

    expect(random).toBeGreaterThan(0);
    expect(random).toBeLessThan(1);
    expect(nookies.set).toHaveBeenCalledWith(ctx, "o_sr", random.toString(), {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      httpOnly: true,
    });
  });
});
