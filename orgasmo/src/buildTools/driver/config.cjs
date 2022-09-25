/* eslint-disable @typescript-eslint/no-var-requires */

const { readFile, writeFile } = require("fs/promises");
const chokidar = require("chokidar");
const isAModule = require("./isAModule");

const driver = process.env.ORGASMO_DRIVER || "@orgasmo/json";

const regexp = new RegExp(
  `^(?<from>\\./drivers/(${driver}|common)/(?<route>[^.]*)/(?<filename>[^/.]+)\\.(?<type>export|event|import)\\.[mc]?[tj]s)$`
);
const globPath = `./drivers/{${driver},common}/**/*.{export,event,import}.{js,ts,mjs,cjs}`;
const filename = "./driver.js";

function fileFromImports(imports, externalPackage) {
  let indexString = "";
  let handlersString = "";
  let eventsString = "";
  let importString = "";

  if (!externalPackage && isAModule(driver)) {
    externalPackage = driver;
  }

  if (externalPackage) {
    indexString = `${indexString}import external from '${externalPackage}';\n\n`;
  }

  const all = {};

  imports.sort((a, b) => {
    const commonFirstA = a.from.replace(/^.\/drivers\/common\//, "!");
    const commonFirstB = b.from.replace(/^.\/drivers\/common\//, "!");

    return commonFirstA <= commonFirstB ? -1 : 1;
  });

  for (const { from, route, filename, importName, name, type } of imports) {
    switch (type) {
      case "import": {
        importString = `${importString}import '${from}';\n`;
        continue;
      }
      case "event": {
        importString = `${importString}import ${importName} from '${from}';\n`;

        eventsString = `${eventsString}events.on('${name}', ${importName});\n`;
        continue;
      }
      case "export": {
        indexString = `${indexString}import ${importName} from '${from}';\n`;
        handlersString = `${handlersString}\n  ['${`${route}/${filename}`
          .replace(/index$/, "")
          .replace(/\//g, ".")}']: ${importName},`;

        let current = all;
        if (route) {
          for (const part of route.split("/")) {
            current = current[part] = current[part] ?? {};
          }
        }
        current[name] = current[name] ?? {};
        current[name].__importName = importName;
      }
    }
  }

  indexString = externalPackage
    ? `${indexString}\n\nconst all = {\n  ...external,${handlersString}\n}\n`
    : `${indexString}\n\nconst all = {${handlersString}\n}\n`;
  indexString = `${indexString}${expand(all, "all")}`;

  indexString = `/**
  * @file This file is created automatically at build time, there is no need to commit it, but you can.
  *
  * To configure the it, pass {driver: boolean|string, ...} to withOrgasmo
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
  * withOrgasmo(nextConfig, { driver: false })
  *
  * @example
  * // forces the use of an external package as driver 
  * withOrgasmo(nextConfig, { driver: 'package-name' })
  *
  */\n\n${
    eventsString && "import events from 'orgasmo/events';"
  }\n${importString}${indexString}\n\n${eventsString}\nexport default all;\n`;

  return indexString;
}

function expand(obj, name) {
  let string = "";
  for (const key in obj) {
    if (key === "__importName") {
      continue;
    }
    string = `${string}\n${name}.${key} = ${obj[key].__importName ?? "{}"};`;
    string = `${string}${expand(obj[key], `${name}.${key}`)}`;
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
    importName: `${route.replace(/\//g, "ー")}ー${filename}`,
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

  console.log("Watching './drivers/**/*' to trigger refresh");
}

exports.fileFromImports = fileFromImports;
exports.map = map;
exports.regexp = regexp;
exports.globPath = globPath;
exports.filename = filename;
exports.refresh = refresh;
