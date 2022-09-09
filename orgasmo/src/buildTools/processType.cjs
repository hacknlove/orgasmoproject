/* eslint-disable @typescript-eslint/no-var-requires */
const { importAll, watchAll } = require("./importAll.cjs");

function process({ type, isEnabled, isDevelopmentServer }) {
  const config = require(`./${type}/config.cjs`);

  if (!isEnabled) {
    console.log(`Automatic ${config.filename} generation is disabled`);
    return;
  }

  if (isDevelopmentServer) {
    watchAll(config);
  }

  return importAll(config);
}

module.exports = process;
