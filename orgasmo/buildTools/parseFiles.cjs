module.exports = function parseFiles(files, regex, map) {
  const imports = [];
  for (let path of files) {
    const match = regex.exec(path);
    if (!match) {
      continue;
    }

    imports.push(map ? map(match.groups) : match.groups);
  }
  return imports;
};
