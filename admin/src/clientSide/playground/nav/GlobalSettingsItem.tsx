import MaterialSymbolsSettingsRounded from "../../icons/MaterialSymbolsSettingsRounded";
import { useDynamicValue } from "@orgasmo/dynamicstate/react";

const filePath = "/site/config";

export default function GlobalSettingsItem() {
  const [activeFilepath, setActiveFilepath] = useDynamicValue(
    "var://activeFilepath_o"
  );

  const selected = activeFilepath == filePath;

  return (
    <div onClick={() => setActiveFilepath(filePath)}>
      <a
        className={`nav_header_li ${selected ? "MainLayout_nav_active_o" : ""}`}
      >
        <MaterialSymbolsSettingsRounded className="MainLayout_nav_svg" />{" "}
        <span>Global settings</span>
      </a>
    </div>
  );
}
