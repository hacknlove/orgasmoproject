/* eslint-disable @typescript-eslint/no-var-requires */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
} = require("next/constants");

const processType = require("./processType.cjs");

module.exports =
  ({ scss = true, driver = true, components = true } = {}) =>
  (cb) =>
  async (phase, ...other) => {
    if (phase !== PHASE_PRODUCTION_SERVER) {
      const isDevelopmentServer = phase === PHASE_DEVELOPMENT_SERVER;
      await Promise.all(
        [
          {
            type: "scss",
            isEnabled: scss,
            isDevelopmentServer,
          },
          {
            type: "driver",
            isEnabled: driver,
            isDevelopmentServer,
            externalPackage: typeof driver === "string" && driver,
          },
          {
            type: "components",
            isEnabled: components,
            isDevelopmentServer,
            externalPackage: typeof components === "string" && components,
          },
        ].map(processType)
      );
    }

    if (cb instanceof Function) {
      return cb(phase, ...other);
    }
    return cb;
  };
