import logger from "./logger";

test("logger logs", () => {
  logger.info({ hola: 1 }, "Test");
});
