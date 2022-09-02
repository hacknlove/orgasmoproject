export default function apiCall({ driver, req, res }) {
  const handler = `${req.query._o.join(".")}.${req.method}`;

  if (driver[handler]) {
    return driver?.[handler](req, res);
  }
  return res.json({
    error: "not found",
  });
}
