import { sync as globSync } from "glob";
import { globPath, regexp } from "./config";
import { resolve, join } from "path";
import { writeFile, readFile } from "fs/promises";

import parseFiles from "../common/parseFiles";

export default async function build(path, output) {
    const cwd = resolve(process.cwd(), path)
  const files = globSync(globPath, {
    cwd,
  });
  
  const imports = parseFiles(files, regexp);

  let string = "";

  for (const { path } of imports) {
    if (!path) {
      continue;
    }
    string = `\
${string}
/* start file: ${path} */
${await readFile(join(cwd, path))}
/* end file: ${path} */

`;
  }
  await writeFile(output || join(path, "style.scss"), string);
}

build(process.argv[2] ?? ".", process.argv[3]);
