#!/usr/bin/env node
const { join } = require("path");
const { stat } = require("fs").promises;
var child_process = require("child_process");
const fs = require("fs-extra");

async function main() {
  const path = process.argv[2];

  if (!path.match(/^[a-z0-9-_]{1,214}$/)) {
    console.error("Error: Package name not valid.");
    console.info(
      "see: https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name"
    );
    process.exit(1);
  }

  if (!path) {
    console.error("Error: Parameter directory missing.");

    console.info("npm init orgasmo directory");
    process.exit(1);
  }

  const target = join(process.cwd(), path);

  const targetStat = await stat(target).catch(() => null);

  if (targetStat) {
    console.error("Error: Directory exists");
    console.info("Try with a new directory name");
    process.exit(1);
  }

  console.info("Scaffolding:");
  await fs.copy(join(__dirname, "empty"), target);

  const packagePath = join(target, "package.json");
  const package = require(packagePath);
  package.name = path;
  fs.writeJSONSync(packagePath, package, { spaces: 4 });

  console.info("Installing dependencies");
  process.chdir(target);

  child_process.execSync("npm i", { stdio: "inherit" });

  console.info("Done!\n\n");

  console.info(`run:\n\ncd ${path}\nnpm run dev\n`);
}

main();
