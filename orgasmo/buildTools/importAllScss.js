const glob = require('util').promisify(require('glob'))
const chokidar = require('chokidar')
const { writeFile } = require('fs').promises

const skipRegexp = /^\.\/style.scss$|(module\.[^.]{3,4}$)|( copy\.[^.]{3,4}$)/
const globPath = './**/*.{scss,sass,css}'

async function createImportAllScss () {
  const files = await glob(globPath)

  let string = `/* This file is created automatically at build time, there is no need to commit it */\n`

  for (let path of files) {
    if (skipRegexp.test(path)) {
      continue
    }
    string = `${string}\n@import '${path}';`
  }

  string = `${string}\n@import 'orgasmo/Slider.scss';\n`

  await writeFile('./style.scss', string).catch(console.error);
}

function watchScss () {
  console.log('Watching global scss')
  let updating
  async function waitandupdate () {
    await updating
    updating = createImportAllScss()
  }

  const scss = chokidar.watch(globPath, {
    ignoreInitial: true,
    awaitWriteFinish: true,
  });
  scss.on('add', waitandupdate);
  scss.on('unlink', waitandupdate);
}

exports.createImportAllScss = createImportAllScss
exports.watchScss = watchScss