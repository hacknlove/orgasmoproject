/* eslint-disable @typescript-eslint/no-var-requires */

const { readFile, writeFile } = require("fs/promises");
const chokidar = require("chokidar");
const isAModule = require("../isAModule");
const { existsSync } = require("fs");

const driver = process.env.ORGASMO_DRIVER || "@orgasmo/json";
const driverArray = driver.split(",");

const regexp = new RegExp(
  `^(?<from>\\./drivers/(${driverArray.join(
    "|"
  )}|common)/(?<route>[^.]*)/(?<filename>[^/.]+)\\.(?<type>export|event|import)\\.[mc]?[tj]s)$`
);

function sort(imports) {
  const sortRegexp = new RegExp(
    `^\\./drivers/(${driverArray.join("|")}|common)/`
  );

  function sortReplace(match, driver) {
    return String.fromCharCode(0xffff - driverArray.indexOf(driver));
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

const globPath = `./drivers/{${driver},common}/**/*.{export,event,import}.{js,ts,mjs,cjs}`;

function byType(imports) {
  const response = {};

  for (const file of imports) {
    response[file.type] ??= [];
    response[file.type].push(file);
  }

  return response;
}

function importExternals(driverArray) {
  let string = "";

  for (const driver of driverArray) {
    if (isAModule(driver)) {
      string = `${string}\nimport ${getExternalName(driver)} from "${driver}";`;
    } else {
      if (!existsSync(`./drivers/${driver}`)) {
        console.error(`CRITICAL: the driver "${driver}" cannot be found:`);
        process.exit(1);
      }
    }
  }
  return string;
}

function justImports(imports) {
  if (!imports) {
    return "";
  }
  sort(imports);

  let string = "";
  for (const { from } of imports) {
    string = `${string}\nimport "${from}";`;
  }

  return string;
}

function importEvents(imports) {
  if (!imports) {
    return "";
  }

  sort(imports);

  const finalImports = {};

  for (const { from, importName } of imports) {
    finalImports[importName] = from;
  }
  let string = `\nimport events from "orgasmo/events";`;

  for (const importName in finalImports) {
    string = `${string}\nimport ${importName} from "${finalImports[importName]}";`;
  }

  return string;
}

function importExports(imports) {
  if (!imports) {
    return "";
  }

  sort(imports);

  const finalImports = {};

  for (const { from, importName } of imports) {
    finalImports[importName] = from;
  }

  let string = "";
  for (const importName in finalImports) {
    string = `${string}\nimport ${importName} from "${finalImports[importName]}";`;
  }

  return string;
}

function useEvents(imports) {
  if (!imports) {
    return "";
  }

  const finalImports = {};

  for (const { importName, name } of imports) {
    finalImports[importName] = name;
  }
  let string = "";

  for (const importName in finalImports) {
    string = `${string}events.on("${finalImports[importName]}", ${importName});\n`;
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
    string = `${string}\n  ["${`${finalImports[importName].route}/${finalImports[importName].filename}`
      .replace(/index$/, "")
      .replace(/\//g, ".")}"]: ${importName},`;
  }

  return string;
}

function useExportsTree(imports) {
  if (!imports) {
    return "";
  }

  const finalImports = {};

  for (const { route, name, importName } of imports) {
    finalImports[importName] = { route, name };
  }

  const all = {};

  for (const importName in finalImports) {
    const { route, name } = finalImports[importName];
    let current = all;
    if (route) {
      for (const part of route.split("/")) {
        current = current[part] = current[part] ?? {};
      }
    }
    current[name] = current[name] ?? {};
    current[name].__importName = importName;
  }

  return expand(all, "driver");
}

function fileFromImports(imports) {
  const importsByType = byType(imports);

  return `\
/**
 * @file This file is created automatically at build time.
 * more info: https://docs.orgasmo.dev/
 */
${importExternals(driverArray)}\
${justImports(importsByType.import)}\
${importEvents(importsByType.event)}\
${importExports(importsByType.export)}

const drivers = ${JSON.stringify(driverArray)};

const driver = {${useExternals(driverArray)}${useExportsStrings(
    importsByType.export
  )}
}
${useExportsTree(importsByType.export)}

${useEvents(importsByType.event)}
export default driver;

for (const driverName of drivers) {
  const startMethodName = \`\${driverName.replace(/\\//g, '.')}.start\`;
  if (driver[startMethodName]) {
    driver[startMethodName](driver, drivers);
  }
}
`;
}

function expand(obj, name) {
  let string = "";
  for (const key in obj) {
    if (key === "__importName") {
      continue;
    }
    string = `${string}\n${name}["${key}"] = ${obj[key].__importName ?? "{}"};`;
    string = `${string}${expand(obj[key], `${name}["${key}"]`)}`;
  }
  return string;
}

function getName(route, filename) {
  return filename === "index"
    ? route.replace(/^.*\/([^/]*?)$/g, "$1")
    : filename;
}
function map({ route = "", filename, from, type }) {
  return {
    from,
    route,
    filename,
    type,
    importName: `${route.replace(/[/[\].]/g, "ー")}ー${filename.replace(
      /[^a-z0-9_]/g,
      "ー"
    )}`,
    name: getName(route, filename),
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
exports.filename = "./driver.js";
exports.refresh = refresh;

if (process.env.NODE_ENV === "test") {
  (exports.sort = sort),
    (exports.empyStringTest = {
      importEvents,
      importExports,
      useEvents,
      useExportsStrings,
      useExportsTree,
    });
}
