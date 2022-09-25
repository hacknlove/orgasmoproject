const regexp =
  /^.\/node_modules|^\.\/style.scss$|.*(module\.[^.]{3,4}$)|.*( copy\.[^.]{3,4}$)|(?<path>.*)/;
const globPath = "./**/*.{scss,sass,css}";
const filename = "./style.scss";

function fileFromImports(imports) {
  let string = `/**
  * @file This file is created automatically at build time, there is no need to commit it, but you can.
  *
  * To configure the it, pass {scss: boolean|string, ...} to withOrgasmo
  *
  * @example
  * // enables creation (the default)
  * withOrgasmo(nextConfig)
  *
  * @example
  * // explicity enables creation
  * withOrgasmo(nextConfig, { scss: true })
  *
  * @example
  * // disable creation
  * withOrgasmo(nextConfig, { scss: false })
  *
  */\n`;

  for (const { path } of imports) {
    if (!path) {
      continue;
    }
    string = `${string}\n@import '${path}';`;
  }

  string = `${string}\n@import '@orgasmo/orgasmo/Slider.scss';\n`;

  return string;
}

exports.fileFromImports = fileFromImports;
exports.globPath = globPath;
exports.filename = filename;
exports.regexp = regexp;
