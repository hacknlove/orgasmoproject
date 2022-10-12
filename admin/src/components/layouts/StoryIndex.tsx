import Area from "@orgasmo/orgasmo/Area";

export default function StoryIndex() {
  return (
    <div id="storyIndex">
      <div id="StoryListComponents">
        <h2 id="StortListComponents_h2">Components</h2>
        <Area name="storiesList" />
      </div>
      <div id="StoryComponent">
        <Area name="storyComponent" />
      </div>
      <div id="StoryPlayground">
        <Area name="storyPlayground" />
      </div>
    </div>
  );
}
