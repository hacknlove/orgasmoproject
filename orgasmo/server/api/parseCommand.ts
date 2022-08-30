import events from "../events";
import getUser from "../lib/getUser";
import { parse } from "../lib/serialization";

export default async function parseCommand({ req, res, driver }) {
  const command = parse(req.query.c);

  if (command.error === "Signature is invalid") {
    events.emit("badSigned", { req, command });

    res.json({
      error: "bad signed",
    });
    return;
  }

  const { roles, expire } = command;

  if (expire < Date.now()) {
    events.emit("expiredSignature", { req, command });

    return res.json({
      error: "expired signature",
    });
  }

  await getUser({ driver, req })

  const user = req.user;

  if (user.roles === roles) {
    return command;
  }

  if (user.roles.length !== roles.length) {
    events.emit("wrongUser", { req, command });

    return res.json({
      error: "wrong user",
    });
  }
  for (let i = 0; i < roles.length; i++) {
    if (user.roles[i] !== roles[i]) {
      events.emit("wrongUser", { req, command });

      return res.json({
        error: "wrong user",
      });
    }
  }

  return command;
}
