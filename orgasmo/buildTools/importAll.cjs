/* eslint-disable @typescript-eslint/no-var-requires */
const glob = require("util").promisify(require("glob"));
const chokidar = require("chokidar");
const { writeFile } = require("fs").promises;

const parseFiles = require("./parseFiles.cjs");

async function importAll({
  externalPackage,
  globPath,
  regexp,
  map,
  fileFromImports,
  filename,
}) {
  const files = await glob(globPath);

  const imports = parseFiles(files, regexp, map);

  const string = fileFromImports(imports, externalPackage);

  await writeFile(filename, string).catch(console.error);
  console.log(filename, "updated");
}

function watchAll(config) {
  console.log("Watching", config.globPath, "to generate", config.filename);
  let updating;
  async function waitandupdate() {
    await updating;
    updating = importAll(config);
  }

  const watcher = chokidar.watch(config.globPath, {
    ignoreInitial: true,
    awaitWriteFinish: true,
  });
  watcher.on("add", waitandupdate);
  watcher.on("unlink", waitandupdate);
}

exports.importAll = importAll;
exports.watchAll = watchAll;
