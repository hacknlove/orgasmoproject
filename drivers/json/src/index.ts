import parseDirectory from "./parseDirectory";
import { watch } from "chokidar";
import { writeFile, readFile } from "fs/promises";
import notPossible from "./admin/notPossible";

const pagesPath =
  process.env.FILESYSTEM_DATA_PATH ?? "drivers/@orgasmo/json/data/pages";

parseDirectory(pagesPath);

import getPageConfig from "./page/getPageConfig";
import getPageConfigFromId from "./page/getPageConfigFromId";

const filesystemDriver = {
  page: {
    getPageConfig,
    getPageConfigFromId,
  },
  admin: {
    updatePageConfig: notPossible,
    newPageConfig: notPossible
  },
  "page.getPageConfig": getPageConfig,
  "page.getPageConfigFromId": getPageConfigFromId,
  "admin.updatePageConfig": notPossible,
  "admin.newPageConfig": notPossible,

};

export default filesystemDriver;

async function reparse() {
  await parseDirectory(pagesPath);

  const componentFile = await readFile("./Components.jsx", {
    encoding: "utf-8",
  }).catch(() => "");
  if (!componentFile) {
    return;
  }
  await writeFile(
    "./Components.jsx",
    componentFile.replace(/^\/\/ Refreshed at .*/gm, "") +
      `// Refreshed at ${new Date().toISOString()}`
  );
}

if (process.env.NODE_ENV === "development") {
  const watcher = watch(pagesPath, {
    ignoreInitial: true,
    awaitWriteFinish: true,
  });

  watcher.on("add", reparse);
  watcher.on("unlink", reparse);
  watcher.on("change", reparse);
}
