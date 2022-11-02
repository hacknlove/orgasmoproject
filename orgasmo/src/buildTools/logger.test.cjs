const logger = require("./logger.cjs");

test("it seems like a logger", () => {
  expect(typeof logger.error).toBe("function");
});
