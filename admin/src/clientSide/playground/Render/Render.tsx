import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import { useRef } from "react";

export default function Render() {
  const ref = useRef() as any;
  const [renderProps] = useDynamicValue("var://renderPropsResource");

  return (
    <div id="PlaygroundRender_o">
      <iframe
        ref={ref}
        id="pageRender_iframe"
        src={renderProps && "/playground?empty=true"}
      />
    </div>
  );
}
