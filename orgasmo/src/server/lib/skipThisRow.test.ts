import skipThisRow from "./skipThisRow";

describe("skipThisRow", () => {
  it("return undefined if all the criteria are not met", () => {
    expect(
      skipThisRow({ rowConfig: {}, ctx: { req: { user: {} } } })
    ).toBeUndefined();
  });
  it("returns {} if the roles criteria is not met", () => {
    expect(
      skipThisRow({
        rowConfig: { roles: { must: ["role"] } },
        ctx: { req: { user: {} } },
      })
    ).toEqual({});
  });
  it("returns {} if the labels criteria is not met", () => {
    expect(
      skipThisRow({
        rowConfig: { labels: { must: ["label"] } },
        ctx: { req: { user: {} } },
      })
    ).toEqual({});
  });
});
