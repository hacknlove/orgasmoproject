import type { NextApiHandler } from "next";
import type { FactoryParameters } from "../../types";
export default function apiFactory({ driver, }: FactoryParameters): NextApiHandler;
