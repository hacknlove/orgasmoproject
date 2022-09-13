import type { NextApiHandler } from "next";
import type { FactoryParameters } from "../../types";
import getItem from "./getItem";
import getMore from "./getMore";
import apiCall from "./apiCall";

export default function apiFactory({
  driver,
}: FactoryParameters): NextApiHandler {
  return async (req, res) => {
    switch (req.query?._o?.[0]) {
      case "_ogr":
        return getItem({ driver, req, res });
      case "_ogm":
        return getMore({ driver, req, res });
      default:
        return apiCall({ driver, req, res });
    }
  };
}