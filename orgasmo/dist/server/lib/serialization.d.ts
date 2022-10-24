import { ErrorObject } from "../../types";
export declare function signit(string: string): string;
export declare function verifyit(signature: string, string: string): boolean;
export declare function serialize(data: any): string;
export declare function parse(data: string): any | ErrorObject;
