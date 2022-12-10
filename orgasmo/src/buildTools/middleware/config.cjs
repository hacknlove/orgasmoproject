/* eslint-disable @typescript-eslint/no-var-requires */

const { readFile, writeFile } = require("fs/promises");
const chokidar = require("chokidar");
const isAModule = require("../isAModule.cjs");

const driver = process.env.ORGASMO_DRIVER || "@orgasmo/json";
const driverArray = driver.split(",");

const driverOrder = {
  "": String.fromCharCode(0xffff),
};
driverArray.forEach((label, i) => {
  driverOrder[label] = String.fromCharCode(0xffff - i - 1);
});

const regexp = new RegExp(
  `^(?<from>\\./drivers/(?<driver>${driverArray.join(
    "|"
  )}|common)/(?<middlewareName>([^.]*/)?(?<filename>[^/.]+))\\.[^/]*)$`
);

function sort(imports) {
  const sortRegexp = new RegExp(
    `^\\./drivers/(${driverArray.join("|")}|common)/`
  );

  function sortReplace(match, driver) {
    return String.fromCharCode(
      0xffff - driverArray.length + driverArray.indexOf(driver)
    );
  }

  imports.sort((a, b) => {
    const commonFirstA = a.from.replace(sortRegexp, sortReplace);
    const commonFirstB = b.from.replace(sortRegexp, sortReplace);

    if (commonFirstA < commonFirstB) {
      return -1;
    }
    if (commonFirstA > commonFirstB) {
      return 1;
    }
    return 0;
  });
}

const globPath = `./drivers/{${driver},common}/**/*.middleware.{js,ts,mjs,cjs}`;

function importExternals(driverArray) {
  let string = "";

  const imported = [];
  for (const driver of driverArray) {
    if (isAModule(`${driver}/middleware`)) {
      string = `${string}\nimport ${getExternalName(
        driver
      )} from "${driver}/middleware";`;
      imported.push(driver);
    }
  }

  driverArray.length = 0;
  driverArray.push(...imported);

  return string;
}

function importExports(imports) {
  if (!imports) {
    return "";
  }

  sort(imports);

  const finalImports = {};

  for (const { from, importName, middlewareName } of imports) {
    finalImports[middlewareName] = [importName, from];
  }

  let string = "";
  for (const [importName, from] of Object.values(finalImports)) {
    string = `${string}\nimport ${importName} from "${from}";`;
  }

  return string;
}

function getExternalName(driver) {
  return driver.replace(/[/@.]/g, "ー");
}

function useExternals(driverArray) {
  let string = "";

  for (const driver of driverArray) {
    if (isAModule(driver)) {
      string = `${string}\n  ...${getExternalName(driver)},`;
    }
  }
  return string;
}

function useExportsStrings(imports) {
  if (!imports) {
    return "";
  }

  let string = "";

  const finalImports = {};

  for (const { route, filename, importName } of imports) {
    finalImports[importName] = { route, filename };
  }

  for (const importName in finalImports) {
    string = `${string}\n  ${importName},`;
  }

  return string;
}

function fileFromImports(imports) {
  return `\
/**
 * @file This file is created automatically at build time.
 * more info: https://docs.orgasmo.dev/
 */

import config from "./config.json";${importExternals(driverArray)}\
${importExports(imports)}

global.config = config;

const middlewares = {
  ${useExternals(driverArray)}
  ${useExportsStrings(imports)}
};

export default middlewares;
`;
}

function map({ driver, filename, from, middlewareName }) {
  return {
    from,
    driver,
    middlewareName,
    filename,
    sortKey: `${driverOrder[driver]}${middlewareName}`,
    importName: `${driver}ー${filename}`.replace(/[^a-z0-9_]/gi, "ー"),
  };
}

function refresh() {
  let updating;

  const watcher = chokidar.watch("./drivers/**/*", {
    ignoreInitial: true,
    awaitWriteFinish: true,
  });

  async function updateComponentsToForceRefresh() {
    const componentFile = await readFile("./Components.jsx", {
      encoding: "utf-8",
    }).catch(() => false);
    if (!componentFile) {
      return;
    }
    await writeFile(
      "./Components.jsx",
      componentFile.replace(/^\/\/ Refreshed at .*/gm, "") +
        `// Refreshed at ${new Date().toISOString()}`
    );
  }
  async function waitandupdate() {
    await updating;
    updating = updateComponentsToForceRefresh();
    return updating;
  }

  watcher.on("add", waitandupdate);
  watcher.on("unlink", waitandupdate);
  watcher.on("change", waitandupdate);

  console.info('Watching "./drivers/**/*" to trigger refresh');
}

exports.fileFromImports = fileFromImports;
exports.map = map;
exports.regexp = regexp;
exports.globPath = globPath;
exports.filename = "./middlewares.js";
exports.refresh = refresh;
