/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import parseDirectory, {
  waitForIt,
  ids,
  staticPaths,
  dynamicPaths,
} from "./parseDirectory";
import { glob } from "glob";
import { readJson } from "fs-extra";
import logger from '@orgasmo/orgasmo/logger';

jest.mock("glob", () => ({
  __esModule: true,
  glob: jest.fn((path, cb) => cb(null, [])),
}));

jest.mock('@orgasmo/orgasmo/logger', () => ({
  __esModule: true,
  default: {
    error: jest.fn()
  }
}));


jest.mock("fs-extra", () => ({
  __esModule: true,
  readJson: jest.fn(),
}));

describe("waitForIt", () => {
  beforeEach(() => {
    ids.clear();
    staticPaths.clear();
    dynamicPaths.clear();
    glob.mockImplementation((path, cb) => cb(null, ["some/test/Path"]));
  });
  it("is a promise", () => {
    expect(waitForIt).toBeInstanceOf(Promise);
  });
  it("is not resolved", async () => {
    const isResolved = jest.fn();
    await Promise.race([
      waitForIt.then(isResolved),
      new Promise((resolve) => setTimeout(resolve, 0)),
    ]);
    expect(isResolved).not.toBeCalled();
  });
  it("resolves when parseDirectory ends", async () => {
    const isResolved = jest.fn();
    await parseDirectory("/dev/null");
    await Promise.race([
      waitForIt.then(isResolved),
      new Promise((resolve) => setTimeout(resolve, 0)),
    ]);
    expect(isResolved).toBeCalled();
  });
});

describe("common", () => {
  it("shows an error if the json is falsy", async () => {
    readJson.mockResolvedValue(undefined);

    await parseDirectory("someDirectory");

    expect(logger.error).toBeCalled();
  });

  it("shows an error if the pageConfig has no path", async () => {
    readJson.mockResolvedValue({});

    await parseDirectory("someDirectory");

    expect(logger.error).toBeCalled();
  });

  it("shows an error if the pageConfig has no pageId", async () => {
    readJson.mockResolvedValue({
      path: "/foo/:bar",
    });

    await parseDirectory("someDirectory");

    expect(logger.error).toBeCalled();
  });
  it("shows an error if there are two pages with the same pageId", async () => {
    glob.mockImplementation((path, cb) =>
      cb(null, ["some/test/Path", "someOther/test/Path"])
    );

    readJson.mockResolvedValue({
      patternPath: "/foo/:bar",
      pageId: "someId",
    });

    await parseDirectory("someDirectory");

    expect(logger.error).toBeCalled();
  });
  it("removes old ids", async () => {
    ids.set("someOldId", {});

    await parseDirectory("someDirectory");

    expect(ids.has("someOldId")).toBe(false);
  });
});

describe("staticPaths", () => {
  beforeEach(() => {
    ids.clear();
    staticPaths.clear();
    dynamicPaths.clear();
    glob.mockImplementation((path, cb) => cb(null, ["some/test/Path"]));
  });

  it("sets the page by pageId", async () => {
    readJson.mockResolvedValue({
      exactPath: "/foo/bar",
      pageId: "someOtherId",
    });

    await parseDirectory("someDirectory");

    expect(ids.has("someOtherId")).toBe(true);
  });

  it("adds the pageConfig as an array if there is another pageConfig for that exactPath", async () => {
    glob.mockImplementation((path, cb) =>
      cb(null, ["some/file/path", "some/otherfile/path", "another/file/path"])
    );

    readJson.mockResolvedValueOnce({
      exactPath: "/foo/bar",
      pageId: "1",
    });
    readJson.mockResolvedValueOnce({
      exactPath: "/foo/bar",
      pageId: "2",
    });
    readJson.mockResolvedValueOnce({
      exactPath: "/foo/bar",
      pageId: "3",
    });

    await parseDirectory("someDirectory");

    expect(staticPaths.get("/foo/bar")).toEqual([
      {
        exactPath: "/foo/bar",
        pageId: "1",
      },
      {
        exactPath: "/foo/bar",
        pageId: "2",
      },
      {
        exactPath: "/foo/bar",
        pageId: "3",
      },
    ]);
  });
});

describe("dynamicPaths", () => {
  beforeEach(() => {
    ids.clear();
    staticPaths.clear();
    dynamicPaths.clear();
    glob.mockImplementation((path, cb) => cb(null, ["some/test/Path"]));
  });

  it("sets the page by pageId", async () => {
    readJson.mockResolvedValue({
      patternPath: "/foo/:bar",
      pageId: "someOtherId",
    });

    await parseDirectory("someDirectory");

    expect(ids.has("someOtherId")).toBe(true);
  });

  it("adds the pageConfig as an array if there is another pageConfig for that patternPath", async () => {
    glob.mockImplementation((path, cb) =>
      cb(null, ["some/file/path", "some/otherfile/path", "another/file/path"])
    );

    readJson.mockResolvedValueOnce({
      patternPath: "/foo/:bar",
      pageId: "1",
    });
    readJson.mockResolvedValueOnce({
      patternPath: "/foo/:bar",
      pageId: "2",
    });
    readJson.mockResolvedValueOnce({
      patternPath: "/foo/:bar",
      pageId: "3",
    });

    await parseDirectory("someDirectory");

    expect(dynamicPaths.get("/foo/:bar").pageConfig).toEqual([
      {
        patternPath: "/foo/:bar",
        pageId: "1",
      },
      {
        patternPath: "/foo/:bar",
        pageId: "2",
      },
      {
        patternPath: "/foo/:bar",
        pageId: "3",
      },
    ]);
  });

  it("sorts the dynamic paths", async () => {
    glob.mockImplementation((path, cb) =>
      cb(null, ["some/file/path", "some/otherfile/path", "another/file/path"])
    );

    readJson.mockResolvedValueOnce({
      patternPath: "/:foo/:second",
      pageId: "2",
    });
    readJson.mockResolvedValueOnce({
      patternPath: "/:foo/(third)",
      pageId: "3",
    });
    readJson.mockResolvedValueOnce({
      patternPath: "/foo/:first",
      pageId: "1",
    });

    await parseDirectory("someDirectory");

    expect(Array.from(dynamicPaths.keys())).toEqual([
      "/foo/:first",
      "/:foo/:second",
      "/:foo/(third)",
    ]);
  });
});
