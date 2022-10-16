import Area from "@orgasmo/orgasmo/Area";
import { AsyncComponents } from "@orgasmo/orgasmo/AsyncComponents";

export default function StoryLayout() {
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
        <Area name="mainArea_o" />
      </div>
    </>
  );
}
