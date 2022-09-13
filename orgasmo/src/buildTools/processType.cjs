/* eslint-disable @typescript-eslint/no-var-requires */
const { importAll, watchAll } = require("./importAll.cjs");

function processType({
  type,
  isEnabled,
  isDevelopmentServer,
  externalPackage,
}) {
  const config = require(`./${type}/config.cjs`);

  if (!isEnabled) {
    console.log(`Automatic ${config.filename} generation is disabled`);
    return;
  }

  if (isDevelopmentServer) {
    watchAll(config, externalPackage);
  }

  return importAll(config, externalPackage);
}

module.exports = processType;
