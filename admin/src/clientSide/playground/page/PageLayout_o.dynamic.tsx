import Area from "@orgasmo/orgasmo/Area";

export default function StoryIndex() {
  return (
    <>
      <div id="PlaygroundTitle_o">
        <div id="playgroundTitle_h1_o">
          <Area name="PlaygroundTitle_o" />
        </div>
      </div>
      <Area name="pagePlaygroundRender_o" />
      <div id="pagePlayground_o">
        <Area name="pagePlayground_o" />
      </div>
    </>
  );
}
