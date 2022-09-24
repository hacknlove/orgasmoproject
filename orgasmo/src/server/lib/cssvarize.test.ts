import cssvarize from "./cssvarize";

describe("cssvarize", () => {
  it("adds -- to the keys", () => {
    expect(cssvarize({ foo: "bar" })).toEqual({ "--foo": "bar" });
  });
});
