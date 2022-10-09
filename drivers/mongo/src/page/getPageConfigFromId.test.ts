import getPageConfigFromId from "../getPageConfigFromId";
import mongoProxy from "../mongoProxy";

describe("getPageConfigFromId", () => {
  let pageConfigs;

  beforeEach(() => {
    pageConfigs = {
      findOne: jest.fn(),
    };

    mongoProxy.pageConfigs = pageConfigs;
  });

  it("it waits for it and returns the page that matches the pageId", async () => {
    pageConfigs.findOne.mockReturnValue("somePageConfig");

    expect(await getPageConfigFromId("someId")).toBe("somePageConfig");
  });
});
