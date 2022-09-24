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

jest.mock("glob", () => ({
  __esModule: true,
  glob: jest.fn((path, cb) => cb(null, [])),
}));

jest.spyOn(console, "error").mockImplementation(() => undefined);

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

    expect(console.error).toBeCalledWith("Something wrong with some/test/Path");
  });

  it("shows an error if the pageConfig has no path", async () => {
    readJson.mockResolvedValue({});

    await parseDirectory("someDirectory");

    expect(console.error).toBeCalled();
  });

  it("shows an error if the pageConfig has no pageId", async () => {
    readJson.mockResolvedValue({
      path: "/foo/:bar",
    });

    await parseDirectory("someDirectory");

    expect(console.error).toBeCalled();
  });
  it("shows an error if there are two pages with the same pageId", async () => {
    glob.mockImplementation((path, cb) =>
      cb(null, ["some/test/Path", "someOther/test/Path"])
    );

    readJson.mockResolvedValue({
      dynamicPath: "/foo/:bar",
      pageId: "someId",
    });

    await parseDirectory("someDirectory");

    expect(console.error).toBeCalledWith(
      'There is already a pageConfig with the pageId "someId"'
    );
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
      staticPath: "/foo/bar",
      pageId: "someOtherId",
    });

    await parseDirectory("someDirectory");

    expect(ids.has("someOtherId")).toBe(true);
  });

  it("adds the pageConfig as an array if there is another pageConfig for that staticPath", async () => {
    glob.mockImplementation((path, cb) =>
      cb(null, ["some/file/path", "some/otherfile/path", "another/file/path"])
    );

    readJson.mockResolvedValueOnce({
      staticPath: "/foo/bar",
      pageId: "1",
    });
    readJson.mockResolvedValueOnce({
      staticPath: "/foo/bar",
      pageId: "2",
    });
    readJson.mockResolvedValueOnce({
      staticPath: "/foo/bar",
      pageId: "3",
    });

    await parseDirectory("someDirectory");

    expect(staticPaths.get("/foo/bar")).toEqual([
      {
        staticPath: "/foo/bar",
        pageId: "1",
      },
      {
        staticPath: "/foo/bar",
        pageId: "2",
      },
      {
        staticPath: "/foo/bar",
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
      dynamicPath: "/foo/:bar",
      pageId: "someOtherId",
    });

    await parseDirectory("someDirectory");

    expect(ids.has("someOtherId")).toBe(true);
  });

  it("adds the pageConfig as an array if there is another pageConfig for that dynamicPath", async () => {
    glob.mockImplementation((path, cb) =>
      cb(null, ["some/file/path", "some/otherfile/path", "another/file/path"])
    );

    readJson.mockResolvedValueOnce({
      dynamicPath: "/foo/:bar",
      pageId: "1",
    });
    readJson.mockResolvedValueOnce({
      dynamicPath: "/foo/:bar",
      pageId: "2",
    });
    readJson.mockResolvedValueOnce({
      dynamicPath: "/foo/:bar",
      pageId: "3",
    });

    await parseDirectory("someDirectory");

    expect(dynamicPaths.get("/foo/:bar").pageConfig).toEqual([
      {
        dynamicPath: "/foo/:bar",
        pageId: "1",
      },
      {
        dynamicPath: "/foo/:bar",
        pageId: "2",
      },
      {
        dynamicPath: "/foo/:bar",
        pageId: "3",
      },
    ]);
  });

  it("sorts the dynamic paths", async () => {
    glob.mockImplementation((path, cb) =>
      cb(null, ["some/file/path", "some/otherfile/path", "another/file/path"])
    );

    readJson.mockResolvedValueOnce({
      dynamicPath: "/:foo/:second",
      pageId: "2",
    });
    readJson.mockResolvedValueOnce({
      dynamicPath: "/:foo/(third)",
      pageId: "3",
    });
    readJson.mockResolvedValueOnce({
      dynamicPath: "/foo/:first",
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
