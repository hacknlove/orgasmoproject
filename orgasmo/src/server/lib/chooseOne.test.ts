/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import choseOne from "./chooseOne";
import seedrandom from "seedrandom";

const random = jest.fn(() => 0.5);

jest.mock("seedrandom", () => ({
  default: jest.fn().mockImplementation(() => random),
}));

describe("choseOne", () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      req: {
        user: {},
      },
      res: {},
    };
  });
  it("returns null if the array is empty", () => {
    expect(choseOne({ array: [], ctx })).toBeNull();
  });
  it("generates a random number seeded with staticRandom and randomSeed if the first element of the array has randomSeed", () => {
    const array = [
      { randomSeed: "test", ratio: 1 },
      { ratio: 1 },
      { ratio: 1 },
    ];
    ctx.req.user.staticRandom = 0.9;
    choseOne({ array, ctx });
    expect(seedrandom).toHaveBeenCalledWith("0.9test");
  });

  it("returns the element that correspond with staticRandom", () => {
    const array = Array.from({ length: 10 }, (_, i) => i);

    ctx.req.user.staticRandom = 0.5;
    expect(choseOne({ array, ctx })).toEqual(5);

    ctx.req.user.staticRandom = 0.99;
    expect(choseOne({ array, ctx })).toEqual(9);

    ctx.req.user.staticRandom = 0;
    expect(choseOne({ array, ctx })).toEqual(0);
  });
  it("some edge cases", () => {
    ctx.req.user.staticRandom = NaN;
    choseOne({ array: [], ctx });
    choseOne({ array: [{ ratio: 1 }], ctx });
  });
});
