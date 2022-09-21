import fileSystemDriver from "./index";

jest.mock("./parseDirectory", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("filesystemDriver", () => {
  it("is an object with the expected methods", () => {
    expect(fileSystemDriver.page.getPageConfig).toBeTruthy();
    expect(fileSystemDriver.page.getPageConfigFromId).toBeTruthy();
    expect(fileSystemDriver["page.getPageConfig"]).toBeTruthy();
    expect(fileSystemDriver["page.getPageConfigFromId"]).toBeTruthy();
  });
});
