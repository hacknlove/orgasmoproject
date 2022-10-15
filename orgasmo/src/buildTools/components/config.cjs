const regexp =
  /(?<from>.*\b(?<filename>[A-Z][A-Za-z0-9]*)\.dynamic\.(.{2,3}))$/;
const globPath = "./**/*.dynamic.{jsx,tsx,js,ts,cjs,mjs}";
const filename = "./DComponent.jsx";
const isAModule = require("../isAModule");

function getName(externalPackage) {
  return externalPackage.replace(/[/.@]/g, "ー");
}

function importExternalPackages(externalPackages) {
  let string = "\n";

  for (const externalPackage of externalPackages) {
    if (!isAModule(externalPackage)) {
      console.warn("module not found:", externalPackage);
      continue;
    }
    string = `${string}import ${getName(
      externalPackage
    )} from "${externalPackage}"\n`;
  }

  return string;
}

function useExternalPackages(externalPackages) {
  let string = "\n";

  for (const externalPackage of externalPackages) {
    if (!isAModule(externalPackage)) {
      console.warn("module not found:", externalPackage);
      continue;
    }
    string = `\n...${getName(externalPackage)},${string}`;
  }

  return string;
}

function useImports(imports) {
  if (!imports) {
    return "";
  }
  let string = "";
  for (const { filename, from } of imports) {
    string = `${string}\n  ${filename}: dynamic(() => import('${from}'), { suspense: true, loading: undefined }),`;
  }

  return string;
}

function fileFromImports(imports, externalPackages) {
  externalPackages = externalPackages || "";
  externalPackages = externalPackages
    .split(",")
    .map((externalPackage) => externalPackage.trim())
    .filter(Boolean);
  externalPackages.push("@orgasmo/admin/Components");

  return `\
/**
* @file This file is created automatically at build time.
* more info: https://docs.orgasmo.dev/
*/
import React from 'react';\nimport dynamic from 'next/dynamic';${importExternalPackages(
    externalPackages
  )}

export const Components = {${useExternalPackages(externalPackages)}${useImports(
    imports
  )}
}

export default function DComponent ({ type, props }) {
  const Component = Components[type] ? Components[type] : () => <div data-component-name={type}/>;
  return <React.Suspense fallback={null}><Component {...props} /></React.Suspense>;
}
`;
}

exports.fileFromImports = fileFromImports;
exports.regexp = regexp;
exports.globPath = globPath;
exports.filename = filename;
