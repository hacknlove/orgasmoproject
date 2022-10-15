import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import Area from "@orgasmo/orgasmo/Area";
import { AsyncComponents } from "@orgasmo/orgasmo/AsyncComponents";

export default function StoryIndex() {
  const [storyPlaygroundArea] = useDynamicValue('var://area/storyPlayground');
  const [storyComponentArea] = useDynamicValue('var://area/storyComponent');
  const [storyTitleArea] = useDynamicValue('var://area/storyTitle');

  return (
    <>
      <AsyncComponents area="_oadminModal" />
      <div id="storyIndex">
        <div id="StoryListComponents">
          <h2 id="StortListComponents_h2">Components</h2>
          <Area name="storiesList" />
        </div>
        <div id="StoryTitle">
          {
            storyTitleArea ? (
              <Area name="storyTitle" />
            ) : (
              <h1>Choose a story</h1>
            )
          }
        </div>
        {
          storyComponentArea && (
            <div id="StoryComponent">
              <Area name="storyComponent" />
            </div>
          )
        }
        {
          storyPlaygroundArea && (
            <div id="StoryPlayground">
              <Area name="storyPlayground" />
            </div>
          )
        }
      </div>
    </>
  );
}
