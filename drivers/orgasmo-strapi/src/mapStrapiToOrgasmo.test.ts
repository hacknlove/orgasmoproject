import mapStrapiToOrgasmo from "./mapStrapiToOrgasmo";

describe("mapStrapiToOrgasmo", () => {
  it("returns undefined if pageConfig is falsy", () => {
    expect(mapStrapiToOrgasmo(false)).toBeUndefined();
  });
  it("maps correctly", () => {
    expect(
      mapStrapiToOrgasmo({
        attributes: {
          pageId: "Some page id",
          cssVars: "cssVars",

          header: [{ someItem: "someItem" }],
          footer: [{ someItem: "someItem" }],
          main: {
            items: [{ someItem: "someItem" }],
            ssrSize: 3,
            threshold: 50,
            mode: "bubble",
          },
        },
      })
    ).toEqual({
      pageId: "Some page id",
      cssVars: "cssVars",
      header: [{ someItem: "someItem" }],
      footer: [{ someItem: "someItem" }],
      main: [{ someItem: "someItem" }],
      mainSsrSize: 3,
      mainThreshold: 50,
      mainMode: "bubble",
    });
  });
});
