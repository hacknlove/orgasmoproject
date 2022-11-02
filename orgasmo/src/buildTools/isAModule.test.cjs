/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const isAModule = require("./isAModule");

describe("isAModule", () => {
  it("true if is a module", () => {
    expect(isAModule("jest")).toBe(true);
  });

  it("false if is a module", () => {
    expect(isAModule("NotAModule")).toBe(false);
  });
});
