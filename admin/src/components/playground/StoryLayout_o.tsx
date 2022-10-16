import Area from "@orgasmo/orgasmo/Area";

export default function StoryLayout() {
  return (
    <>
      <div id="playgroundTitle_o">
        <Area name="storyTitle" />
      </div>
      <div id="StoryComponent">
        <Area name="storyComponent" />
      </div>
      <div id="StoryPlayground">
        <Area name="storyPlayground" />
      </div>
    </>
  );
}
