import getPageConfigFromId from "./getPageConfigFromId.export";
import mongoProxy from "../mongoProxy";

describe("getPageConfigFromId", () => {
  let pages;

  beforeEach(() => {
    pages = {
      findOne: jest.fn(),
    };

    mongoProxy.connect = jest.fn();

    mongoProxy.pages = pages;
  });

  it("it waits for it and returns the page that matches the pageId", async () => {
    pages.findOne.mockReturnValue("somePageConfig");

    expect(await getPageConfigFromId("someId")).toBe("somePageConfig");
  });
});
