/* eslint-disable @typescript-eslint/no-var-requires */

const { join } = require("path");
const isAModule = require("../isAModule.cjs");

const deepmerge = require("@fastify/deepmerge")({
  mergeArray: (options) => (target, source) => options.clone(source),
});

let config = {};

function requireAndMerge(requirePath, mergePath) {
  if (!isAModule(requirePath)) {
    return;
  }

  try {
    delete require.cache[require.resolve(requirePath)];
    const data = require(requirePath);
    return merge(data, mergePath);
  } catch (error) {
    console.error(`Cannot be required and merged: ${requirePath}`);
    console.error(error);
  }
}

async function merge(data, mergePath) {
  if (typeof data === "function") {
    return merge(data(config), mergePath);
  }
  if (data instanceof Promise) {
    return merge(await data, mergePath);
  }

  if (!mergePath) {
    config = deepmerge(config, data);
    return;
  }

  let configCursor = config;

  const pathArray = mergePath.split("/");
  const lastSegment = pathArray.pop();

  for (const segment of pathArray) {
    if (!configCursor[segment]) {
      configCursor[segment] = {};
    }

    configCursor = configCursor[segment];
  }

  configCursor[lastSegment] = deepmerge(configCursor[lastSegment] ?? {}, data);
}

const configString = `default${
  process.env.ORGASMO_CONFIG ? `,${process.env.ORGASMO_CONFIG}` : ""
}`;

const configArray = configString.split(",");

const confirOrder = {
  "": String.fromCharCode(0xffff),
};

configArray.forEach((label, i) => {
  confirOrder[label] = String.fromCharCode(0xffff - i - 1);
});

const globPath = `./**/config/**/+({${configArray.join(",")}}.){js,json}`;

const regexp = new RegExp(
  `^(?<requirePath>(?<preMergePath>.*?)/config/(.*/@root)?(?<mergePath>.*?)/?(?<labels>(${configArray.join(
    "|"
  )}).)+js(on)?)$`
);

function sort(imports) {
  imports.sort((a, b) => {
    if (a.sortKey < b.sortKey) {
      return -1;
    }
    if (a.sortKey > b.sortKey) {
      return 1;
    }
    return 0;
  });
}

async function importExternals(configArray) {
  for (const label of configArray) {
    if (isAModule(label)) {
      await requireAndMerge(label);
    }
  }
}

async function importFiles(imports) {
  if (!imports) {
    return;
  }

  sort(imports);

  for (const { requirePath, mergePath } of imports) {
    await requireAndMerge(requirePath, mergePath);
  }
}

function importEnvironment() {
  for (const key in process.env) {
    if (!key.startsWith("CONFIG_")) {
      continue;
    }

    const mergePath = key.replace(/([^_])_([^_])/g, "$1/$2");

    try {
      const data = JSON.parse(process.env[key]);
      merge(data, mergePath);
    } catch (error) {
      console.error(error);

      console.log(`Maybe the value of environmental variable ${key} is not valid JSON?
value:
${process.env[key]}
`);
    }
  }
}

async function fileFromImports(imports) {
  await importExternals(configArray);

  await importFiles(imports);

  await importEnvironment();

  return JSON.stringify(config, null, 2);
}

exports.map = function map({ requirePath, labels, mergePath }) {
  return {
    requirePath: join(process.cwd(), requirePath),
    mergePath, //: mergePath.replace(/\/$/, ''),
    sortKey:
      labels
        .split(".")
        .map((label) => confirOrder[label])
        .join("") + requirePath,
  };
};

exports.fileFromImports = fileFromImports;
exports.regexp = regexp;
exports.globPath = globPath;
exports.filename = "./config.json";
exports.watchChange = true;
