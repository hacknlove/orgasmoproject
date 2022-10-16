import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import Area from "@orgasmo/orgasmo/Area";
import { AsyncComponents } from "@orgasmo/orgasmo/AsyncComponents";

export default function StoryIndex() {
  const [storyPlaygroundArea] = useDynamicValue("var://area/storyPlayground");
  const [storyComponentArea] = useDynamicValue("var://area/storyComponent");
  const [storyTitleArea] = useDynamicValue("var://area/storyTitle");

  return (
    <>
      <AsyncComponents area="playgroundModal_o" />
      <div id="playground_o">
        <nav id="playgroundSideNav_o">
          <h2 id="StortListComponents_h2">Components</h2>
          <Area name="storiesList" />
          <h2 id="StortListComponents_h2">Pages</h2>
          <Area name="pagesList" />
        </nav>
        <div id="playgroundTitle_o">
          {storyTitleArea ? (
            <Area name="storyTitle" />
          ) : (
            <h1>Choose a story</h1>
          )}
        </div>
        {storyComponentArea && (
          <div id="StoryComponent">
            <Area name="storyComponent" />
          </div>
        )}
        {storyPlaygroundArea && (
          <div id="StoryPlayground">
            <Area name="storyPlayground" />
          </div>
        )}
      </div>
    </>
  );
}
