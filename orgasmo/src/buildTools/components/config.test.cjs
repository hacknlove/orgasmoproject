const { regexp, globPath, fileFromImports } = require("./config");
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
import React from 'react';
import dynamic from 'next/dynamic';
import ーorgasmoーadminーComponents from "@orgasmo/admin/Components"


export const Components = {
...ーorgasmoーadminーComponents,

  Foo: dynamic(() => import('./components/Foo.dynamic.tsx'), { suspense: true, loading: undefined }),
  Bar: dynamic(() => import('./components/Bar.dynamic.tsx'), { suspense: true, loading: undefined }),
}

export default function DComponent ({ type, props }) {
  const Component = Components[type]
  if (!Component) {
    return <div data-component-name={type}/>
  }
  return <React.Suspense fallback={null}><Component {...props} /></React.Suspense>;
}
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
import React from 'react';
import dynamic from 'next/dynamic';
import ーorgasmoーadminーComponents from "@orgasmo/admin/Components"


export const Components = {
...ーorgasmoーadminーComponents,

  Foo: dynamic(() => import('./components/Foo.dynamic.tsx'), { suspense: true, loading: undefined }),
  Bar: dynamic(() => import('./components/Bar.dynamic.tsx'), { suspense: true, loading: undefined }),
}

export default function DComponent ({ type, props }) {
  const Component = Components[type]
  if (!Component) {
    return <div data-component-name={type}/>
  }
  return <React.Suspense fallback={null}><Component {...props} /></React.Suspense>;
}
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
