/* eslint-disable @typescript-eslint/no-var-requires */
const glob = require("util").promisify(require("glob"));
const chokidar = require("chokidar");
const { writeFile } = require("fs").promises;

const parseFiles = require("./parseFiles.cjs");

async function importAll(
  { globPath, regexp, map, fileFromImports, filename },
  externalPackage
) {
  const files = await glob(globPath);

  const imports = parseFiles(files, regexp, map);

  const string = await fileFromImports(imports, externalPackage);

  await writeFile(filename, string).catch(console.error);
  console.info(filename, "updated");
}

function watchAll(config, externalPackage) {
  console.info("Watching", config.globPath, "to generate", config.filename);
  let updating;
  async function waitandupdate() {
    await updating;
    updating = importAll(config, externalPackage);
  }

  const watcher = chokidar.watch(config.globPath, {
    ignoreInitial: true,
    awaitWriteFinish: true,
  });
  watcher.on("add", waitandupdate);
  watcher.on("unlink", waitandupdate);
  if (config.watchChange) {
    watcher.on("change", waitandupdate);
  }

  if (config.refresh) {
    config.refresh();
  }
}

exports.importAll = importAll;
exports.watchAll = watchAll;
