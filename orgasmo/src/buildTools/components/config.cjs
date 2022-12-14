const regexp =
  /(?<from>.*\b(?<filename>[A-Z][A-Za-z0-9_]*)\.dynamic\.(.{2,3}))$/;
const globPath = "./**/*.dynamic.{jsx,tsx,js,ts,cjs,mjs}";
const filename = "./Components.jsx";
const isAModule = require("../isAModule.cjs");

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
    string = `\n  ...${getName(externalPackage)},${string}`;
  }

  return string;
}

function useImports(imports) {
  if (!imports) {
    return "";
  }
  let string = "";
  for (const { filename, from } of imports) {
    if (/node_modules/.test(from)) {
      continue;
    }
    string = `${string}\n  ${filename}: dynamic(() => import("${from}"), { suspense: true, loading: undefined }),`;
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
import dynamic from "next/dynamic";
import Area from "@orgasmo/orgasmo/Area";${importExternalPackages(
    externalPackages
  )}
const Components = {
  Area,${useExternalPackages(externalPackages)}${useImports(imports)}
}

export default Components;
`;
}

exports.fileFromImports = fileFromImports;
exports.regexp = regexp;
exports.globPath = globPath;
exports.filename = filename;

if (process.env.NODE_ENV === "test") {
  exports.test = {
    useImports,
  };
}
