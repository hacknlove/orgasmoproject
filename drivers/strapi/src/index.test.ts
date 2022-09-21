import fileSystemDriver from "./index";

describe("filesystemDriver", () => {
  it("is an object with the expected methods", () => {
    expect(fileSystemDriver.page.getPageConfig).toBeTruthy();
    expect(fileSystemDriver.page.getPageConfigFromId).toBeTruthy();
    expect(fileSystemDriver["page.getPageConfig"]).toBeTruthy();
    expect(fileSystemDriver["page.getPageConfigFromId"]).toBeTruthy();
  });
});
