import { useDynamicChange, useDynamicValue } from "@orgasmo/dynamicstate/react";
import Tab from "./Tab";

export default function Tabs() {
  const [tabs, setTabs] = useDynamicValue("var://tabs_o");

  useDynamicChange("var://activeFilepath_o", (activeFilename) => {
    if (!activeFilename) {
      return;
    }
    if (!tabs) {
      setTabs([activeFilename]);
      return;
    }
    if (!tabs.includes(activeFilename)) {
      setTabs([...tabs, activeFilename]);
    }
  });

  return (
    <div className="tabs_o">
      {tabs?.map((filePath) => (
        <Tab key={filePath} filePath={filePath} />
      ))}
      <div style={{ flexGrow: 1 }}></div>
    </div>
  );
}
