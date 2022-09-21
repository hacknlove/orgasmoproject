import { createHash } from "crypto";

export default function RandomRows({ rowConfig, from = 0, count = 15 }) {
  return {
    items: Array.from({ length: count }, (_, i) => ({
      key: rowConfig.seed + from + i,
      string: createHash("md5")
        .update(rowConfig.seed + from + i)
        .digest("base64")
        .replace(/=/g, "")
        .replace(/\//g, "-"),
      number: from + i,
    })),
    getMore: {
      handler: "random.rows",
      rowConfig: {
        seed: rowConfig.seed,
      },
    },
  };
}
