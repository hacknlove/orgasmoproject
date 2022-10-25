import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import MaterialSymbolsAdd from "../../icons/MaterialSymbolsAdd";

let filecount = 1;

export default function GlobalSettingsItem() {
  const [activeFilepath, setActiveFilepath] = useDynamicValue(
    "var://activeFilepath_o"
  );

  const selected = activeFilepath?.startsWith?.("/new");

  return (
    <div onClick={() => setActiveFilepath(`/new/new-file-${filecount++}`)}>
      <a
        className={`nav_header_li ${selected ? "MainLayout_nav_active_o" : ""}`}
      >
        <MaterialSymbolsAdd className="MainLayout_nav_svg" />{" "}
        <span>New File</span>
      </a>
    </div>
  );
}
