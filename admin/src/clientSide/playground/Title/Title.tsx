import { useDynamicValue } from "@orgasmo/dynamicstate/react";

export default function Title() {
  const [activeFilepath] = useDynamicValue("var://activeFilepath_o");
  return (
    <div id="PlaygroundTitle_o">
      <label>{activeFilepath || "Orgasmo's Playground"}</label>
      <div style={{ flexGrow: 1 }} />
    </div>
  );
}
