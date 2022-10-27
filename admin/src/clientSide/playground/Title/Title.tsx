import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import DeleteItem from "./DeleteItem";
import SelectLayoutMode from "./SelectLayoutMode";
import SelectPathSample from "./SelectPathSample";

export default function Title() {
  const [activeFilepath] = useDynamicValue("var://activeFilepath_o");

  return (
    <div id="PlaygroundTitle_o">
      <SelectLayoutMode />
      <label>{activeFilepath || "Orgasmo's Playground"}</label>
      <div style={{ flexGrow: 1 }} />
      <SelectPathSample filePath={activeFilepath} />
      <DeleteItem filePath={activeFilepath} />
    </div>
  );
}
