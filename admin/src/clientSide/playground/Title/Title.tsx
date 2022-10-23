import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import DeleteItem from "./DeleteItem";
import SelectPathSample from "./SelectPathSample";

export default function Title() {
  const [activeFilepath] = useDynamicValue("var://activeFilepath_o");
  return (
    <div id="PlaygroundTitle_o">
      <label>{activeFilepath || "Orgasmo's Playground"}</label>
      <div style={{ flexGrow: 1 }} />
      <SelectPathSample filePath={activeFilepath} />
      <DeleteItem filePath={activeFilepath} />
    </div>
  );
}
