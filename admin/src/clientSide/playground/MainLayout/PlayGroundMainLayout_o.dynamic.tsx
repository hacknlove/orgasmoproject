import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import Area from "@orgasmo/orgasmo/Area";
import Editor from "../Editor/Editor";
import Tabs from "../Editor/Tabs";
import NewFile from "../nav/NewFile";
import Render from "../Render/Render";
import Title from "../Title/Title";
import HorizontalSize from "./HorizontalSize";
import VerticalSize from "./VerticalSize";

export default function PlayGroundMainLayout_o() {
  const [layoutMode] = useDynamicValue("var://layoutMode", {
    defaultValue: "rows",
  });

  return (
    <>
      <div id="MainLayout_o">
        <nav id="MainLayout_nav_o">
          <NewFile />
          <Area name="MainLayout_nav_o" />
        </nav>
        <HorizontalSize />
        <Title />
        <div id={`MainLayout_mode_${layoutMode}_o`}>
          <Render />
          <VerticalSize mode={layoutMode} target="PlaygroundRender_o" />
          <div
            style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <Tabs />
            <Editor />
          </div>
        </div>
      </div>
    </>
  );
}
