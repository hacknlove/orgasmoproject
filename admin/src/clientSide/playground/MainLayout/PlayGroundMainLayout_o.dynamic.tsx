import Area from "@orgasmo/orgasmo/Area";
import { AsyncComponents } from "@orgasmo/orgasmo/AsyncComponents";

export default function PlayGroundMainLayout_o() {
  return (
    <>
      <AsyncComponents area="playgroundModal_o" />
      <div id="MainLayout_o">
        <nav id="MainLayout_nav_o">
          <Area name="MainLayout_nav_o" />
        </nav>
        <Area name="mainArea_o" />
      </div>
    </>
  );
}
