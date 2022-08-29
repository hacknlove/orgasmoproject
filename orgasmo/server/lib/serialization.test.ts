import { serialize, parse, signit, verifyit } from "./serialization";

process.env.ORGASMO_SECRET = "secret";

it("serializes and parses", () => {
  const data = [
    1,
    2,
    {
      key: "value",
    },
    new Date(0),
    {
      undefined: undefined,
      null: null,
      nan: NaN,
      infinity: Infinity,
    },
    true,
    false,
    "yep, it works",
  ];

  const serialized = serialize(data);
  const parsed = parse(serialized);

  expect(serialized).toBeDefined();
  expect(serialized).toBeTruthy();
  expect(typeof serialized).toBe("string");

  expect(parsed).toEqual(data);
});

it("throws if the signature is wrong", () => {
  const data = serialize(["something"]);
  const other = serialize(["somethingelse"]);

  const badSignature = data.substring(0, 35) + other.substring(35);

  jest.spyOn(console, "error").mockImplementation(() => {});
  expect(parse(badSignature)).toEqual({ error: "Signature is invalid" });
});
