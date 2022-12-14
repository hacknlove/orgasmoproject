const regexp =
  /^.\/node_modules|^\.\/style.scss$|.*(module\.[^.]{3,4}$)|.*( copy\.[^.]{3,4}$)|(?<path>.*)/;
const globPath = "./**/*.{scss,sass,css}";
const filename = "./style.scss";

function fileFromImports(imports) {
  let string = `/**
  * @file This file is created automatically at build time.
  * more info: https://docs.orgasmo.dev/
  */\n`;

  for (const { path } of imports) {
    if (!path) {
      continue;
    }
    string = `${string}\n@import "${path}";`;
  }

  string = `${string}\n@import "@orgasmo/orgasmo/Slider.scss";\n`;

  return string;
}

exports.fileFromImports = fileFromImports;
exports.globPath = globPath;
exports.filename = filename;
exports.regexp = regexp;
