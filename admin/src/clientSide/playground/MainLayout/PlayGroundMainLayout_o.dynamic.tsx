import Area from "@orgasmo/orgasmo/Area";
import { AsyncComponents } from "@orgasmo/orgasmo/AsyncComponents";
import GlobalSettingsItem from "../nav/GlobalSettingsItem";

export default function StoryLayout() {
  return (
    <>
      <AsyncComponents area="playgroundModal_o" />
      <div id="MainLayout_o">
        <nav id="MainLayout_nav_o">
          <GlobalSettingsItem />
          <h2 id="MainLayout_nav_list_title_o">Components</h2>
          <Area name="storiesList_o" />
          <h2 id="MainLayout_nav_list_title_o">Pages</h2>
          <Area name="pagesList_o" />
        </nav>
        <Area name="mainArea_o" />
      </div>
    </>
  );
}
