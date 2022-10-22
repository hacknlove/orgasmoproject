import Area from "@orgasmo/orgasmo/Area";
import { AsyncComponents } from "@orgasmo/orgasmo/AsyncComponents";
import Editor from "../Editor/Editor";
import Render from "../Render/Render";
import Title from "../Title/Title";
import HorizontalSize from "./HorizontalSize";
import VerticalSize from "./VerticalSize";

export default function PlayGroundMainLayout_o() {
  return (
    <>
      <AsyncComponents area="playgroundModal_o" />
      <div id="MainLayout_o">
        <nav id="MainLayout_nav_o">
          <Area name="MainLayout_nav_o" />
        </nav>
        <HorizontalSize />
        <Title />
        <Render />
        <VerticalSize />
        <Editor />
      </div>
    </>
  );
}
