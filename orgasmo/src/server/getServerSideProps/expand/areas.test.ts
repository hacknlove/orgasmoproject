import expandAreas from "./areas";

jest.mock("./area", () => ({
  __esModule: true,
  default: jest.fn(({ name }) => name),
}));

describe("expand areas", () => {
  const params = {};
  const timeChunk = {};
  const pageId = "somePageId";
  const ctx = {};

  it("returns an empty object if there are no areas", async () => {
    expect(
      await expandAreas({
        params,
        timeChunk,
        pageId,
        ctx,
        areasConfig: undefined,
      })
    ).toEqual({});
  });

  it("calls expandArea for each area", async () => {
    expect(
      await expandAreas({
        params,
        timeChunk,
        pageId,
        ctx,
        areasConfig: {
          foo: {},
          bar: {},
          buz: {},
        },
      })
    ).toEqual({
      foo: "foo",
      bar: "bar",
      buz: "buz",
    });
  });
});
