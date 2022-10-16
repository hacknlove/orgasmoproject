import { sync as globSync } from "glob";
import { globPath, regexp } from "./config";
import { resolve, join } from "path";
import { writeFile } from "fs/promises";

import map from "./lib/map";

import parseFiles from "../common/parseFiles";
import byType from "./lib/byType";
import importEvents from "./lib/importEvents";
import importExports from "./lib/importExport";
import useExportsStrings from "./lib/useExportsStrings";
import useEvents from "./lib/useEvents";
import useExportsTree from "./lib/useExportsTree";

export default async function build(path) {
  const files = globSync(globPath, {
    cwd: resolve(process.cwd(), path),
  });

  const imports = parseFiles(files, regexp, map);

  const importsByType = byType(imports);

  const string = `\
${importEvents(importsByType.event)}\
${importExports(importsByType.export)}

${useEvents(importsByType.event)}

const driver = {${useExportsStrings(importsByType.export)}
}
${useExportsTree(importsByType.export)}

export default driver;
`;

  await writeFile(join(path, "driver.ts"), string);
}

build(process.argv[2] ?? ".");
