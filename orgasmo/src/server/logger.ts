import pino, { Logger } from "pino";
import events from "./events";

const logger = new Proxy(pino(), {
  get(target, key) {
    return (mergingObject, message, ...interpolationValues) => {
      events.emit(`logger-${key.toString()}`, mergingObject);
      target[key](mergingObject, message, ...interpolationValues);
    };
  },
}) as Logger;

export default logger;
