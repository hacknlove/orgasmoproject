import Area from "@orgasmo/orgasmo/Area";
import { AsyncComponents } from "@orgasmo/orgasmo/AsyncComponents";
import Link from 'next/link'
import MaterialSymbolsSettingsRounded from "../icons/MaterialSymbolsSettingsRounded";

export default function StoryLayout() {
  return (
    <>
      <AsyncComponents area="playgroundModal_o" />
      <div id="playground_o">
        <nav id="playgroundSideNav_o">
          <Link href="/playground">
            <a id="playgroundHomeLink_o">
              <MaterialSymbolsSettingsRounded /> <span>Global settings</span>
            </a>
          </Link>
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
