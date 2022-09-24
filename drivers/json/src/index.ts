import parseDirectory from "./parseDirectory";
import { watch } from "chokidar";
import { writeFile, readFile } from "fs/promises";

const pagesPath =
  process.env.FILESYSTEM_DATA_PATH ?? "drivers/@orgasmo/json/data/pages";

parseDirectory(pagesPath);

import getPageConfig from "./getPageConfig";
import getPageConfigFromId from "./getPageConfigFromId";

const filesystemDriver = {
  page: {
    getPageConfig,
    getPageConfigFromId,
  },
  "page.getPageConfig": getPageConfig,
  "page.getPageConfigFromId": getPageConfigFromId,
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
