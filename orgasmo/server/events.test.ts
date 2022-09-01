import { EventEmitter } from "node:stream";
import events from "./events";

test("exports an event emiter", () => {
  expect(events).toBeInstanceOf(EventEmitter);
});
