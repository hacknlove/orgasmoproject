const { regexp, globPath, fileFromImports, map } = require('./config')
const { join } = require('path')

const glob = require('glob')

test('driver regexp gets the full path and the file name from components starting with capital leter and ending in dynamic.{js,...}', () => {
    const files = [
        './drivers/mocked/foo/bar.export.js',
        './drivers/other/foo/bar.export.js',
        './drivers/mocked/foo/baz.js'
    ]

    expect(regexp.exec(files[0]).groups).toEqual({
        filename: 'bar',
        from: './drivers/mocked/foo/bar.export.js',
        route: 'foo',
    })
    expect(regexp.exec(files[1])).toBeNull()
    expect(regexp.exec(files[2])).toBeNull()
})

test('driver globPath finds files from the driver folder ending with export', (done) => {
    const expected = [
        './drivers/mocked/foo.export.js'
    ]
    
    glob(globPath, {cwd: join(__dirname, '/test/globPath') }, (err, files) => {
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

test('driver fileFromImports returns a js source from imports', () => {
    const imports = [
        { filename: 'foo', from: './drivers/mocked/something/foo.export.tsx', name: 'foo', importName: 'foo', route: 'something' },
        { filename: 'bar', from: './drivers/mocked/something/bar.export.tsx', name: 'bar', importName: 'bar', route: 'something' },
    ]
    const expected = `/* This file is created automatically at build time, there is no need to commit it */
// @ts-nocheck

import foo from './drivers/mocked/something/foo.export.tsx';
import bar from './drivers/mocked/something/bar.export.tsx';


const all = {
  ['something.foo']: foo,
  ['something.bar']: bar,
}

all.something = {}
all.something.foo = foo
all.something.bar = bar

export default all
`
    const actual = fileFromImports(imports)
    expect(actual).toEqual(expected)
})

describe('driver map', () => {
    it('adds the importName and the name fields', () => {
        const groups = {
            filename: 'foo',
            from: './drivers/mocked/some/route/foo.export.tsx',
            route: 'some/route',
        }
    
        const expected = {
            filename: 'foo',
            from: './drivers/mocked/some/route/foo.export.tsx',
            route: 'some/route',
            importName: 'someーrouteーfoo',
            name: 'foo',
        }
        const actual = map(groups)
        expect(actual).toEqual(expected)
    })
    it('uses the last piece of the route as name if filename is index', () => {
        const groups = {
            filename: 'index',
            from: './drivers/mocked/some/route/index.export.tsx',
            route: 'some/route',
        }
    
        const expected = {
            filename: 'index',
            from: './drivers/mocked/some/route/index.export.tsx',
            route: 'some/route',
            importName: 'someーrouteーindex',
            name: 'route',
        }
        const actual = map(groups)
        expect(actual).toEqual(expected)
    })
})
