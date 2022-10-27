import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import PhColumns from "../../icons/PhColumns";
import PhRows from "../../icons/PhRows";

const Icons = {
  columns: PhRows,
  rows: PhColumns,
};

const layouts = ["rows", "columns"];
let i = 0;

const toggleConfig = {
  rows: {
    set: "height",
    clean: "width",
  },
  columns: {
    set: "width",
    clean: "height",
  },
};
let savedValue;

export default function SelectLayoutMode() {
  const [layoutMode, setLayoutMode] = useDynamicValue("var://layoutMode", {
    defaultValue: "rows",
  });

  const Icon = Icons[layoutMode] ?? (() => null);

  function toggleLayoutMode() {
    i = (i + 1) & 1;
    const newLayoutMode = layouts[i];
    setLayoutMode(newLayoutMode);

    const PlaygroundRender_o = document.getElementById("PlaygroundRender_o");
    const config = toggleConfig[newLayoutMode];

    if (!PlaygroundRender_o) {
      return;
    }

    if (!savedValue) {
      PlaygroundRender_o.style.flexGrow = "1";
    } else {
      PlaygroundRender_o.style.flexGrow = "0";
      PlaygroundRender_o.style[config.set] = savedValue;
    }
    savedValue = PlaygroundRender_o.style[config.clean];
    PlaygroundRender_o.style[config.clean] = "";
  }

  return <Icon className="icon_o" onClick={toggleLayoutMode} />;
}
