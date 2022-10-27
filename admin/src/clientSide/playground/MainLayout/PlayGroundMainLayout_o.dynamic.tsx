import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import Area from "@orgasmo/orgasmo/Area";
import { AsyncComponents } from "@orgasmo/orgasmo/AsyncComponents";
import Editor from "../Editor/Editor";
import Tabs from "../Editor/Tabs";
import GlobalSettingsItem from "../nav/GlobalSettingsItem";
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
      <AsyncComponents area="playgroundModal_o" />
      <div id="MainLayout_o">
        <nav id="MainLayout_nav_o">
          <h2 className="MainLayout_nav_list_title_o">Playground</h2>
          <NewFile />
          <GlobalSettingsItem />
          <Area name="MainLayout_nav_o" />
        </nav>
        <HorizontalSize />
        <Title />
        <div id={`MainLayout_mode_${layoutMode}_o`}>
          <Render />
          <VerticalSize />
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
