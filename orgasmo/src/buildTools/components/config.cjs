const regexp =
  /(?<from>.*\b(?<filename>[A-Z][A-Za-z0-9]*)\.dynamic\.(.{2,3}))$/;
const globPath = "./**/*.dynamic.{jsx,tsx,js,ts,cjs,mjs}";
const filename = "./DComponent.jsx";

function fileFromImports(imports, externalPackage) {
  let string = `/**
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
  */\nimport React from 'react';\nimport dynamic from 'next/dynamic';\n`;

  if (externalPackage) {
    string = `${string}import external from ${externalPackage}\n\n`;
  }

  string = `${string}\nexport const Components = {`

  if (externalPackage) {
    string = `${string}\n  ...external.Components,`
  }


  for (const { filename, from } of imports) {
    string = `${string}\n  ${filename}: dynamic(() => import('${from}'), { suspense: true }),`;
  }
  string = `${string}\n}`

  string = `${string}\n\nexport default function DComponent ({ type, props }) {\nswitch (type) {`;

  for (const { filename } of imports) {
    string = `${string}\n  case '${filename}':\n    return <React.Suspense fallback={null}><Components.${filename} {...props} /></React.Suspense>`;
  }

  string = externalPackage
    ? `${string}\n  default:\n    return external({ type, props }) ?? <div data-component-name={type}/>\n`
    : `${string}\n  default:\n    return <div data-component-name={type}/>\n`;

  return `${string}  }\n}\n`;
}

exports.fileFromImports = fileFromImports;
exports.regexp = regexp;
exports.globPath = globPath;
exports.filename = filename;
