import { useDynamicValue } from "@orgasmo/dynamicstate/react";

export default function Title() {
  const [activeFilepath] = useDynamicValue("var://activeFilepath_o");
  return (
    <div id="PlaygroundTitle_o">
      <h1>{activeFilepath || "Orgasmo's Playground"}</h1>
    </div>
  );
}
