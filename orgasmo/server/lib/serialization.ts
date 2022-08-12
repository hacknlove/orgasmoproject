import { sign, verify } from 'cencode';
import { createHash } from 'crypto';
const secret = process.env.ORGASMO_SECRET;

export function signit (string) {
  return createHash('md5').update(`${string}${secret}`).digest("hex");
}
export function verifyit (signature, string) {
  return signit(string) === signature;
}

export function serialize (data) {
   return sign(data, signit);
}
export function parse (data) {
  try {
    return verify(data, verifyit);
  } catch (e) {
    console.error(e)
    return { error: 'Signature is invalid' };
  }
}

