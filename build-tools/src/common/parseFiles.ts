export default function parseFiles(files, regex, map?) {
  const imports = [] as Record<string, any>[];
  for (const path of files) {
    const match = regex.exec(path);
    if (!match) {
      continue;
    }

    imports.push(map ? map(match.groups) : match.groups);
  }
  return imports;
}
