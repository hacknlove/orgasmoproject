import Area from "@orgasmo/orgasmo/Area";

export default function StoryIndex() {
  return (
    <>
      <div id="playgroundTitle_o">
        <Area name="playgroundTitle_o" />
      </div>
      <Area name="pageRender_o" />
      <div id="pagePlayground_o">
        <Area name="pagePlayground_o" />
      </div>
    </>
  );
}
