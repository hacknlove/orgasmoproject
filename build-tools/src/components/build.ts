import { sync as globSync } from "glob";
import { globPath, regexp } from "./config";
import { resolve, join } from "path";
import { writeFile } from "fs/promises";

import parseFiles from "../common/parseFiles";
import useImports from "./useImports";

export default async function build(path) {
  const files = globSync(globPath, {
    cwd: resolve(process.cwd(), path),
  });

  const imports = parseFiles(files, regexp);

  const string = `\
import dynamic from 'next/dynamic';

export default {${useImports(imports)}
}
`;

  await writeFile(join(path, "Components.tsx"), string);
}

build(process.argv[2] ?? ".");
