/* eslint-disable @typescript-eslint/ban-ts-comment */
import { sign, verify, cencode, decencode } from "cencode";
import {
  scrypt,
  createHash,
  randomBytes,
  createCipheriv,
  createDecipheriv,
} from "crypto";
import logger from "../logger";

const secret = process.env.ORGASMO_SECRET ?? "orgamos_secret";

import { ErrorObject } from "../../types";
import { promisify } from "util";

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
    logger.error(e, "Error parsing string");
    return { error: "Signature is invalid" };
  }
}

const algorithm = "aes-192-cbc";
const keyLength = 24;

const scryptP = promisify(scrypt);
const randomBytesP = promisify(randomBytes);

export async function encrypt(data: any, password) {
  // @ts-ignore
  const keyP = scryptP(password, secret, keyLength, {
    cost: 2,
  }) as Promise<Buffer>;
  const ivP = randomBytesP(16);

  const encodedData = cencode(data);

  const iv = await ivP;
  const key = await keyP;

  const cipher = createCipheriv(algorithm, await key, await iv);

  return Buffer.concat([
    iv,
    cipher.update(encodedData, "utf8"),
    cipher.final(),
  ]).toString("base64url");
}

export function decrypt(base64url: string, key) {
  const buffer = Buffer.from(base64url, "base64url");
  const iv = buffer.subarray(0, keyLength);
  const ciphered = buffer.subarray(keyLength);

  const decipher = createDecipheriv(algorithm, key, iv);
  // @ts-ignore
  const cencoded = decipher.update(ciphered, "utf8") + decipher.final("utf8");

  return decencode(cencoded);
}
