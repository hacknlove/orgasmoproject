import type { NextApiHandler } from "next";
import type { FactoryParameters } from "../../types";
import getItem from "./getItem";
import getMore from "./getMore";
import apiCall from "./apiCall";
import events from "../events";

export default function apiFactory({
  driver,
}: FactoryParameters): NextApiHandler {
  return async (req, res) => {
    const ctx = {
      driver,
      req,
      res,
      events,
    };
    switch (req.query?._o?.[0]) {
      case "_ogr":
        return getItem(ctx);
      case "_ogm":
        return getMore(ctx);
      default:
        return apiCall(ctx);
    }
  };
}
