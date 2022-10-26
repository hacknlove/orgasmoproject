import { useDynamicState, useDynamicValue } from "@orgasmo/dynamicstate/react";
import MaterialSymbolsAdd from "../../icons/MaterialSymbolsAdd";

let filecount = 1;

export default function GlobalSettingsItem() {
  const [activeFilepath, setActiveFilepath] = useDynamicValue(
    "var://activeFilepath_o"
  );
  const dynamicState = useDynamicState();

  const selected = activeFilepath?.startsWith?.("/new");

  function createNewFile() {
    const filePath = `/new/new-file-${filecount++}`;
    setActiveFilepath(filePath);
    dynamicState.setValue(`var://file${filePath}?content`, "{}");
    dynamicState.setValue(`var://file${filePath}?original`, "{}");
  }

  return (
    <div onClick={createNewFile}>
      <a
        className={`nav_header_li ${selected ? "MainLayout_nav_active_o" : ""}`}
      >
        <MaterialSymbolsAdd className="MainLayout_nav_svg" />{" "}
        <span>New File</span>
      </a>
    </div>
  );
}
