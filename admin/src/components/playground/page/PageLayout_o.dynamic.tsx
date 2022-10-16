import Area from "@orgasmo/orgasmo/Area";

export default function StoryIndex() {
  return (
    <>
      <div id="playgroundTitle_o">
        <Area name="playgroundTitle" />
      </div>
      <Area name="pageRender" />
      <div id="StoryPlayground">
        <Area name="storyPlayground" />
      </div>
    </>
  );
}
