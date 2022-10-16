import Area from "@orgasmo/orgasmo/Area";
import { AsyncComponents } from "@orgasmo/orgasmo/AsyncComponents";
import Link from "next/link";
import MaterialSymbolsSettingsRounded from "../../icons/MaterialSymbolsSettingsRounded";

export default function StoryLayout() {
  return (
    <>
      <AsyncComponents area="playgroundModal_o" />
      <div id="MainLayout_o">
        <nav id="MainLayout_nav_o">
          <Link href="/playground">
            <a id="MainLayout_nav_home_o">
              <MaterialSymbolsSettingsRounded /> <span>Global settings</span>
            </a>
          </Link>
          <h2 id="MainLayout_nav_list_title_o">Components</h2>
          <Area name="storiesList" />
          <h2 id="MainLayout_nav_list_title_o">Pages</h2>
          <Area name="pagesList" />
        </nav>
        <Area name="mainArea_o" />
      </div>
    </>
  );
}
