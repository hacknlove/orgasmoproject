import { createContext } from "react";

import type { DComponent } from "../types";

type AreaContext = {
  DComponent: DComponent;
  areas: Record<string, any>;
  layout: Record<string, any>;
  setLayout: { (layout: Record<string, any>): void };
  setAreas: { (areas: Record<string, any>): void };
};

export default createContext<AreaContext>({} as AreaContext);
