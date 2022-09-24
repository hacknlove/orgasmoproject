import mapStrapiToOrgasmo from "./mapStrapiToOrgasmo";

describe("mapStrapiToOrgasmo", () => {
  it("returns undefined if pageConfig is falsy", () => {
    expect(mapStrapiToOrgasmo(false)).toBeUndefined();
  });
  it("maps null to undefined", () => {
    expect(
      mapStrapiToOrgasmo({
        attributes: {
          pageId: "Some page id",
          areas: {},
          layout: null,
        },
      })
    ).toEqual({
      pageId: "Some page id",
      areas: {},
      layout: undefined,
    });
  });
});
