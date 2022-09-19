const { join } = require("path");
const { writeJSON } = require("fs-extra");
const { exec } = require("child_process");
const { promisify } = require("util");

const execPromise = promisify(exec);

const isOrgasmoRegexp = /^orgasmo($|-)/;

async function main() {
  const status = await execPromise("git status --porcelain");

  if (status.stdout.length) {
    console.error("The repo is not clean");
    process.exit(1);
  }

  const pack = require("../package.json");

  const version = pack.version;

  const promises = [];

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

    console.log("Publishing", workspacePackage.name);

    promises.push(
      execPromise("npm publish --dry-run", {
        cwd: join(process.cwd(), workspace),
      })
    );
  }

  await Promise.all(promises);

  console.log("commit and tag");
  await execPromise("npm i --package-lock-only");

  await execPromise(`git commit -am ${pack.version}`);
  await execPromise(`git tag ${pack.version}`);
  await execPromise(`git push`);
  await execPromise(`git push origin ${pack.version}`);
}

main();
