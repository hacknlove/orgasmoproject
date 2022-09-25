import { createContext } from "react";

import type { Components } from "../types";

type AreaContext = {
  Components: Components;
  areas: Record<string, any>;
  layout: Record<string, any>;
  setLayout: { (layout: Record<string, any>): void };
  setAreas: { (areas: Record<string, any>): void };
};

export default createContext<AreaContext>({} as AreaContext);
