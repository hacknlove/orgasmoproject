import Area from "@orgasmo/orgasmo/Area";

export default function StoryLayout() {
  return (
    <>
      <div id="PlaygroundTitle_o">
        <div id="playgroundTitle_h1_o">
          <Area name="PlaygroundTitle_o" />
        </div>
      </div>
      <div id="PlaygroundRender_o">
        <Area name="PlaygroundRender_o" />
      </div>
      <div id="PlaygroundEditor_o">
        <Area name="PlaygroundEditor_o" />
      </div>
    </>
  );
}
