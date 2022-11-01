const {
  regexp,
  globPath,
  fileFromImports,
  test: { useImports },
} = require("./config");
const glob = require("glob");

test("components regexp gets the full path and the file name from components starting with capital leter and ending in dynamic.{js,...}", () => {
  const files = [
    "some/path/Component1.dynamic.js",
    "some/path/component2.dynamic.jsx",
    "some/path/Component3.ts",
  ];

  expect(regexp.exec(files[0]).groups).toEqual({
    from: "some/path/Component1.dynamic.js",
    filename: "Component1",
  });
  expect(regexp.exec(files[1])).toBeNull();
  expect(regexp.exec(files[2])).toBeNull();
});

test("components globPath finds components ending with dynamic", (done) => {
  const expected = [
    "./src/buildTools/components/test/globPath/but/this.dynamic.tsx",
  ];
  glob(globPath, (err, files) => {
    if (err) {
      done(err);
    } else {
      try {
        expect(files).toEqual(expected);
        done();
      } catch (err) {
        done(err);
      }
    }
  });
});

describe("components fileImports", () => {
  it("returns a js source from imports", () => {
    const imports = [
      { filename: "Foo", from: "./components/Foo.dynamic.tsx" },
      { filename: "Bar", from: "./components/Bar.dynamic.tsx" },
    ];
    const expected = `/**
* @file This file is created automatically at build time.
* more info: https://docs.orgasmo.dev/
*/
import dynamic from "next/dynamic";
import Area from "@orgasmo/orgasmo/Area";
import ーorgasmoーadminーComponents from "@orgasmo/admin/Components"

const Components = {
  Area,
  ...ーorgasmoーadminーComponents,

  Foo: dynamic(() => import("./components/Foo.dynamic.tsx"), { suspense: true, loading: undefined }),
  Bar: dynamic(() => import("./components/Bar.dynamic.tsx"), { suspense: true, loading: undefined }),
}

export default Components;
`;
    const actual = fileFromImports(imports);

    expect(actual).toEqual(expected);
  });
  it("skips missing externalPackages", () => {
    const imports = [
      { filename: "Foo", from: "./components/Foo.dynamic.tsx" },
      { filename: "Bar", from: "./components/Bar.dynamic.tsx" },
    ];
    const expected = `/**
* @file This file is created automatically at build time.
* more info: https://docs.orgasmo.dev/
*/
import dynamic from "next/dynamic";
import Area from "@orgasmo/orgasmo/Area";
import ーorgasmoーadminーComponents from "@orgasmo/admin/Components"

const Components = {
  Area,
  ...ーorgasmoーadminーComponents,

  Foo: dynamic(() => import("./components/Foo.dynamic.tsx"), { suspense: true, loading: undefined }),
  Bar: dynamic(() => import("./components/Bar.dynamic.tsx"), { suspense: true, loading: undefined }),
}

export default Components;
`;
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
    const actual = fileFromImports(imports, "foo-externalPackage");
    expect(actual).toEqual(expected);
    expect(console.warn).toBeCalledWith(
      "module not found:",
      "foo-externalPackage"
    );
  });
});

describe("useImports", () => {
  it("returns empty string if there is no imports", () => {
    expect(useImports()).toEqual("");
  });

  it("skips components from node modules", () => {
    expect(
      useImports([
        { from: "path", filename: "Component" },
        { from: "node_modules/path", filename: "Component2" },
        { from: "other/path", filename: "Component3" },
      ])
    ).toEqual(`
  Component: dynamic(() => import("path"), { suspense: true, loading: undefined }),
  Component3: dynamic(() => import("other/path"), { suspense: true, loading: undefined }),`);
  });
});
