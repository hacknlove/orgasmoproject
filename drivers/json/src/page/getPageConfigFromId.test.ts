import getPageConfigFromId from "./getPageConfigFromId";
import { ids } from "../parseDirectory";

jest.mock("../parseDirectory", () => ({
  __esModule: true,
  waitForIt: Promise.resolve(),
  ids: new Map(),
}));

describe("getPageConfigFromId", () => {
  it("it waits for it and returns the page that matches the pageId", async () => {
    ids.set("someId", "somePageConfig");

    expect(await getPageConfigFromId("someId")).toBe("somePageConfig");
  });
});
