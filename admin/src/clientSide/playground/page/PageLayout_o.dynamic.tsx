import Area from "@orgasmo/orgasmo/Area";

export default function PageLAyout_o() {
  return (
    <>
      <div id="PlaygroundTitle_o">
        <div id="playgroundTitle_h1_o">
          <Area name="PlaygroundTitle_o" />
        </div>
      </div>
      <Area name="PlaygroundRender_o" />
      <div id="pagePlayground_o">
        <Area name="pagePlayground_o" />
      </div>
    </>
  );
}
