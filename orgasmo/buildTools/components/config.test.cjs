const { regexp, globPath, fileFromImports } = require('./config')
const glob = require('glob')

test('components regexp gets the full path and the file name from components starting with capital leter and ending in dynamic.{js,...}', () => {
    const files = [
        'some/path/Component1.dynamic.js',
        'some/path/component2.dynamic.jsx',
        'some/path/Component3.ts'
    ]

    expect(regexp.exec(files[0]).groups).toEqual({
        from: 'some/path/Component1.dynamic.js',
        filename: 'Component1'
    })
    expect(regexp.exec(files[1])).toBeNull()
    expect(regexp.exec(files[2])).toBeNull()
})

test('components globPath finds components ending with dynamic', (done) => {
    const expected = [
        './buildTools/components/test/globPath/but/this.dynamic.tsx'
    ]
    glob(globPath, (err, files) => {
        if (err) {
            done(err)
        } else {
            try {
                expect(files).toEqual(expected)
                done()
            } catch (err) {
                done(err)
            }
        }
    })
})

test('components fileFromImports returns a js source from imports', () => {
    const imports = [
        { filename: 'Foo', from: './components/Foo.dynamic.tsx' },
        { filename: 'Bar', from: './components/Bar.dynamic.tsx' },
    ]
    const expected = `/* This file is created automatically at build time, there is no need to commit it */
import React from 'react';
import dynamic from 'next/dynamic';

const Foo = dynamic(() => import('./components/Foo.dynamic.tsx'), { suspense: true });
const Bar = dynamic(() => import('./components/Bar.dynamic.tsx'), { suspense: true });

export default function DynamicComponent ({ type, props }) {
 switch (type) {
    case 'Foo':
      return <React.Suspense fallback={null}><Foo {...props} /></React.Suspense>
    case 'Bar':
      return <React.Suspense fallback={null}><Bar {...props} /></React.Suspense>
    default:
      return <div data-component-name={type}/>
  }
}
`
    const actual = fileFromImports(imports)
    expect(actual).toEqual(expected)
})

