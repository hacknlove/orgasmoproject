/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

process.env.NODE_ENV = "development";
import fileSystemDriver from "./index";
import { watch } from "chokidar";
import parseDirectory from "./page/parseDirectory";
import { readFile } from "fs/promises";

jest.mock("fs/promises", () => ({
  writeFile: jest.fn().mockResolvedValue(""),
  readFile: jest.fn().mockResolvedValue("something"),
}));

jest.mock("chokidar", () => {
  const watcher = {
    on: (event, handler) => {
      watcher[event] = handler;
    },
  };
  return {
    __esModule: true,
    watch: () => watcher,
  };
});

jest.mock("./page/parseDirectory", () => ({
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

  it("parseDirectory is called again if some json changes", async () => {
    expect(parseDirectory).toBeCalledTimes(0);
    await watch().add();
    expect(parseDirectory).toBeCalledTimes(1);
  });

  it("does not crash if the Components file is missing or empty", async () => {
    readFile.mockRejectedValue("");
    expect(parseDirectory).toBeCalledTimes(0);
    await watch().add();
    expect(parseDirectory).toBeCalledTimes(1);
  });
});
