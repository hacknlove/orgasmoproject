import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import { useRef, useEffect, useState } from "react";
import useExpandPage from "./useExpandPage";

export default function Render() {
  const ref = useRef() as any;
  const [sharedState, setSharedState] = useState(null);

  const [filePath] = useDynamicValue("var://activeFilepath_o");
  const [fileContent] = useDynamicValue(`var://file${filePath}?content`);
  const [pathParams] = useDynamicValue(`var://file${filePath}?params`);

  useExpandPage({
    sharedState,
    filePath,
    fileContent,
    pathParams,
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    setSharedState(null);
    ref.current.contentWindow.location.reload();
  }, [filePath]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    function processMessage(message) {
      if (message.data !== "sharedStateReady") {
        return;
      }

      setSharedState(ref.current.contentWindow.sharedState);
    }

    window.addEventListener("message", processMessage);

    return () => window.removeEventListener("message", processMessage);
  }, [ref.current]);

  return (
    <div id="PlaygroundRender_o">
      <iframe ref={ref} id="pageRender_iframe" src={"/playground?empty=true"} />
    </div>
  );
}
