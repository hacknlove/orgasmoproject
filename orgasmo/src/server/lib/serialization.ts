import { sign, verify } from "cencode";
import { createHash } from "crypto";
const secret = process.env.ORGASMO_SECRET;

import { ErrorObject } from "../../types";

export function signit(string: string): string {
  return createHash("md5").update(`${string}${secret}`).digest("hex");
}
export function verifyit(signature: string, string: string): boolean {
  return signit(string) === signature;
}

export function serialize(data: any): string {
  return sign(data, signit);
}
export function parse(data: string): any | ErrorObject {
  try {
    return verify(data, verifyit);
  } catch (e) {
    console.error(e);
    return { error: "Signature is invalid" };
  }
}
