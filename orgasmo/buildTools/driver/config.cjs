const driver = process.env.ORGASMO_DRIVER || 'mocked'

const regexp = new RegExp(`^(?<from>\\./drivers/${driver}/(?<route>.*)/(?<filename>[^/]+)\\.export\\.m?[tj]s)$`)
const globPath = `./drivers/${driver}/**/*.export.{js,ts}`
const filename = './driver.js'

function fileFromImports(imports) {
    let indexString = `/* This file is created automatically at build time, there is no need to commit it */\n// @ts-nocheck\n\n`
    let handlersString = ''

    const all = {}

    for (const { from, route, filename, importName, name } of imports) {
        indexString = `${indexString}import ${importName} from '${from}';\n`
        handlersString = `${handlersString}\n  ['${`${route}/${filename}`.replace(/index$/, '').replace(/\//g, '.')}']: ${importName},`

        let current = all
        if (route) {
            for (const part of route.split('/')) {
                current = current[part] = current[part] ?? {}
            }
        }
        current[name] = current[name] ?? {}
        current[name].__importName = importName

    }

    indexString = `${indexString}\n\nconst all = {${handlersString}\n}\n`
    indexString = `${indexString}${expand(all, 'all')}`

    indexString = `${indexString}\n\nexport default all\n`

    return indexString
}

function expand (obj, name) {
    let string = ''
    for (const key in obj) {
        if (key === '__importName') {
            continue
        }
        string = `${string}\n${name}.${key} = ${obj[key].__importName ?? '{}'}`
        string = `${string}${expand(obj[key], `${name}.${key}`)}`
    }
    return string
  }

function getName (route, filename) {
    return filename === 'index'
    ? route.replace(/^.*\/([^/]*?)$/g, '$1')
    : filename
}
function map({ route = '', filename, from }) {
    return {
        from,
        route,
        filename,
        importName: `${route.replace(/\//g, 'ー')}ー${filename}`,
        name: getName(route, filename)
    }
}

exports.fileFromImports = fileFromImports
exports.map = map
exports.regexp = regexp
exports.globPath = globPath
exports.filename = filename
