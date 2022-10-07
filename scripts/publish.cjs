const { join } = require("path");
const { writeJSON } = require("fs-extra");
const { exec } = require("child_process");
const { promisify } = require("util");

const execPromise = promisify(exec);

const isOrgasmoRegexp = /^@orgasmo\//;

async function main() {
  const status = await execPromise("git status --porcelain");

  if (
    status.stdout.length &&
    status.stdout !== " M package-lock.json\n M package.json\n"
  ) {
    console.error("The repo is not clean");
    process.exit(1);
  }

  const pack = require("../package.json");

  const version = pack.version;

  const promises = [];

  pack.workspaces.push('create-orgasmo/empty')

  for (const workspace of pack.workspaces) {
    const path = join(process.cwd(), workspace, "package.json");

    const workspacePackage = require(path);

    workspacePackage.version = version;
    for (const key of Object.keys(workspacePackage.dependencies ?? {})) {
      if (isOrgasmoRegexp.test(key)) {
        workspacePackage.dependencies[key] = version;
      }
    }
    for (const key of Object.keys(workspacePackage.devDependencies ?? {})) {
      if (isOrgasmoRegexp.test(key)) {
        workspacePackage.devDependencies[key] = version;
      }
    }
    for (const key of Object.keys(workspacePackage.peerDependencies ?? {})) {
      if (isOrgasmoRegexp.test(key)) {
        workspacePackage.peerDependencies[key] = version;
      }
    }

    promises.push(writeJSON(path, workspacePackage, { spaces: 2 }));
  }

  promises.length = 0;

  for (const workspace of pack.workspaces) {
    const path = join(process.cwd(), workspace, "package.json");

    const workspacePackage = require(path);

    if (workspacePackage.private) {
      continue;
    }

    console.info("Publishing", workspacePackage.name);
    await execPromise("npm publish --access public", {
      cwd: join(process.cwd(), workspace),
    });
  }

  console.info("commit and tag");
  await execPromise("npm i --package-lock-only");

  await execPromise(`git commit -am ${pack.version}`);
  await execPromise(`git tag ${pack.version}`);
  await execPromise(`git push`);
  await execPromise(`git push origin ${pack.version}`);
}

main();
