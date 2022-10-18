import parsePageDirectory from "./page/parseDirectory";
import parseStoryDirectory from "./admin/parseDirectory";

import { watch } from "chokidar";
import { writeFile, readFile } from "fs/promises";
import notPossible from "./admin/notPossible";

const dataPath =
  process.env.FILESYSTEM_DATA_PATH ?? "drivers/@orgasmo/json/data";

const pagesPath = `${dataPath}/pages`;

const storiesPath = `${dataPath}/stories`;

parsePageDirectory(pagesPath);
parseStoryDirectory(storiesPath);

import getPageConfig from "./page/getPageConfig";
import getPageConfigFromId from "./page/getPageConfigFromId";
import getAllStories from "./admin/getAllStories";

const filesystemDriver = {
  page: {
    getPageConfig,
    getPageConfigFromId,
  },
  admin: {
    updatePageConfig: notPossible,
    newPageConfig: notPossible,
    upsertStoryConfig: notPossible,
    newStoryConfig: notPossible,
    deletePageConfig: notPossible,
    deleteStoryConfig: notPossible,
    getAllStories,
  },
  "page.getPageConfig": getPageConfig,
  "page.getPageConfigFromId": getPageConfigFromId,
  "admin.updatePageConfig": notPossible,
  "admin.newPageConfig": notPossible,
  "admin.upsertStoryConfig": notPossible,
  "admin.newStoryConfig": notPossible,
  "admin.getAllStories": getAllStories,
  "admin.deletePageConfig": notPossible,
  "admin.deleteStoryConfig": notPossible,
};

export default filesystemDriver;

async function reparse() {
  await Promise.all([
    parsePageDirectory(pagesPath),
    parseStoryDirectory(storiesPath),
  ]);

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
