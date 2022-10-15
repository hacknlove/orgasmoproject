import Area from "@orgasmo/orgasmo/Area";
import { AsyncComponents } from "@orgasmo/orgasmo/AsyncComponents";

export default function StoryIndex() {
  return (
    <>
      <AsyncComponents area="_oadminModal" />
      <div id="storyIndex">
        <div id="StoryListComponents">
          <h2 id="StortListComponents_h2">Components</h2>
          <Area name="storiesList" />
        </div>
        <div id="StoryTitle">
          <Area name="storyTitle" />
        </div>
        <div id="StoryComponent">
          <Area name="storyComponent" />
        </div>
        <div id="StoryPlayground">
          <Area name="storyPlayground" />
        </div>
      </div>
    </>
  );
}
