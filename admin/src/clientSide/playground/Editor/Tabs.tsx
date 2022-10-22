import {
  useDynamicChange,
  useDynamicValue,
  useDynamicState,
} from "@orgasmo/dynamicstate/react";
import Tab from "./Tab";
import { useEffect } from "react";

export default function Tabs() {
  const [tabs, setTabs] = useDynamicValue("var://tabs_o");
  const dynamicstate = useDynamicState() as any;

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

  useEffect(() => {
    function onKeyDown(event) {
      if (!event.altKey && !event.ctrlKey) {
        return;
      }
      const activeFilePath = dynamicstate.getValue("var://activeFilepath_o");

      switch (event.key) {
        case "w": {
          const tabs = dynamicstate.getValue("var://tabs_o");

          dynamicstate.setValue(
            "var://tabs_o",
            tabs.filter((path) => path !== activeFilePath)
          );
          dynamicstate.setValue("var://activeFilepath_o", tabs[0]);
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="tabs_o">
      {tabs?.map((filePath) => (
        <Tab key={filePath} filePath={filePath} />
      ))}
      <div style={{ flexGrow: 1 }}></div>
    </div>
  );
}
