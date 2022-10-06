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
  * @file This file is created automatically at build time, there is no need to commit it, but you can.
  *
  * To configure the it, pass {components: boolean|string, ...} to withOrgasmo
  *
  * @example
  * // enables creation (the default)
  * withOrgasmo(nextConfig)
  *
  * @example
  * // explicity enables creation
  * withOrgasmo(nextConfig, { components: true })
  *
  * @example
  * // disable creation
  * withOrgasmo(nextConfig, { components: false })
  *
  * @example
  * // forces the use of an external package as components 
  * withOrgasmo(nextConfig, { components: 'package-name' })
  *
  */
import React from 'react';
import dynamic from 'next/dynamic';

const Foo = dynamic(() => import('./components/Foo.dynamic.tsx'), { suspense: true });
const Bar = dynamic(() => import('./components/Bar.dynamic.tsx'), { suspense: true });

export default function DComponent ({ type, props }) {
switch (type) {
  case 'Foo':
    return <React.Suspense fallback={null}><Foo {...props} /></React.Suspense>
  case 'Bar':
    return <React.Suspense fallback={null}><Bar {...props} /></React.Suspense>
  default:
    return <div data-component-name={type}/>
  }
}
`;
    const actual = fileFromImports(imports);
    expect(actual).toEqual(expected);
  });
  it("uses the externalPackage if provided", () => {
    const imports = [
      { filename: "Foo", from: "./components/Foo.dynamic.tsx" },
      { filename: "Bar", from: "./components/Bar.dynamic.tsx" },
    ];
    const expected = `/**
  * @file This file is created automatically at build time, there is no need to commit it, but you can.
  *
  * To configure the it, pass {components: boolean|string, ...} to withOrgasmo
  *
  * @example
  * // enables creation (the default)
  * withOrgasmo(nextConfig)
  *
  * @example
  * // explicity enables creation
  * withOrgasmo(nextConfig, { components: true })
  *
  * @example
  * // disable creation
  * withOrgasmo(nextConfig, { components: false })
  *
  * @example
  * // forces the use of an external package as components 
  * withOrgasmo(nextConfig, { components: 'package-name' })
  *
  */
import React from 'react';
import dynamic from 'next/dynamic';
import external from foo-externalPackage


const Foo = dynamic(() => import('./components/Foo.dynamic.tsx'), { suspense: true });
const Bar = dynamic(() => import('./components/Bar.dynamic.tsx'), { suspense: true });

export default function DComponent ({ type, props }) {
switch (type) {
  case 'Foo':
    return <React.Suspense fallback={null}><Foo {...props} /></React.Suspense>
  case 'Bar':
    return <React.Suspense fallback={null}><Bar {...props} /></React.Suspense>
  default:
    return external({ type, props }) ?? <div data-component-name={type}/>
  }
}
`;
    const actual = fileFromImports(imports, "foo-externalPackage");
    expect(actual).toEqual(expected);
  });
});
