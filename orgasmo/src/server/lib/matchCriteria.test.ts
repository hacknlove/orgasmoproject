import matchCriteria from "./matchCriteria";

describe("matchCriteria", () => {
  it("returns true if there are no rules", () => {
    expect(
      matchCriteria({
        rules: null,
        actualSet: new Set(),
      })
    ).toBe(true);
  });

  it("returns false if there is rules.cannot includes one of the roles", () => {
    expect(
      matchCriteria({
        rules: {
          cannot: ["some role"],
        },
        actualSet: new Set(["some role"]),
      })
    ).toBe(false);
  });
  it("returns false if any of the rules.must is not included on the roles", () => {
    expect(
      matchCriteria({
        rules: {
          cannot: [],
          must: ["roleA", "roleB"],
        },
        actualSet: new Set(["roleA"]),
      })
    ).toBe(false);
  });
  it("returns false none of the rules.any is included on the roles", () => {
    expect(
      matchCriteria({
        rules: {
          must: ["roleC"],
          any: ["roleA", "roleB"],
        },
        actualSet: new Set(["roleC"]),
      })
    ).toBe(false);
  });
  it("returns true if all three requeriments are met", () => {
    expect(
      matchCriteria({
        rules: {
          cannot: ["roleA"],
          must: ["roleB"],
          any: ["roleC", "roleD"],
        },
        actualSet: new Set(["roleB", "roleC"]),
      })
    ).toBe(true);

    expect(
      matchCriteria({
        rules: {
          cannot: ["roleA"],
          must: ["roleB"],
        },
        actualSet: new Set(["roleB", "roleC"]),
      })
    ).toBe(true);
  });
});
