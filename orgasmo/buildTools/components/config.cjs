const regexp = /(?<from>.*\b(?<filename>[A-Z][A-Za-z0-9]*)\.dynamic\.(.{2,3}))$/
const globPath = './**/*.dynamic.{jsx,tsx,js,ts,cjs,mjs}'
const filename = './Components.jsx'

function fileFromImports(imports) {
    let string = `/* This file is created automatically at build time, there is no need to commit it */\nimport React from 'react';\nimport dynamic from 'next/dynamic';\n`
    
    for (const { filename, from } of imports) {
        string = `${string}\nconst ${filename} = dynamic(() => import('${from}'), { suspense: true });`
    }
    
    string = `${string}\n\nexport default function DynamicComponent ({ type, props }) {\n switch (type) {`
    
    for (const { filename } of imports) {
        string = `${string}\n    case '${filename}':\n      return <React.Suspense fallback={null}><${filename} {...props} /></React.Suspense>`
    }
    
    string = `${string}\n    default:\n      return <div data-component-name={type}/>\n  }\n}\n`
    
    return string
}
 
exports.fileFromImports = fileFromImports
exports.regexp = regexp
exports.globPath = globPath
exports.filename = filename