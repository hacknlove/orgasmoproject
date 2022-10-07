import getUser from "../lib/getUser";

export default async function apiCall(ctx) {
  const { driver, req, res } = ctx;
  const handler = `${req.query._o.join(".")}.${req.method}`;

  if (!driver[handler]) {
    return res.json({
      error: "not found",
    });
  }

  await getUser(ctx);

  return driver[handler](ctx);
}
