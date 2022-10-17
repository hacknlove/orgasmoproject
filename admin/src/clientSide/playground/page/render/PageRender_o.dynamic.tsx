import { useRef, useEffect } from "react";
import useExpandPage from "./useExpandPage";

function setValues({ sharedState, props }) {
  for (const key of Array.from(sharedState.resources.keys())) {
    if (key === "var://DComponent") {
      continue;
    }
    //    sharedState.setValue(key, null)
  }

  sharedState.setValue("var://layout", props.layout);
  const areasNames = [] as string[];

  for (const areaName in props.areas) {
    areasNames.push(areaName);
    sharedState.setValue(`var://area/${areaName}`, props.areas[areaName]);
  }
  sharedState.setValue("var://areasNames", areasNames);
}

export default function PageRender({ pageConfig, samplePath }) {
  const ref = useRef() as any;
  useEffect(() => {
    (window as any).thisIframe = ref;
  }, []);

  const sharedState = useRef();

  const props = useExpandPage({ pageConfig, samplePath }) as any;

  useEffect(() => {
    function processMessage(message) {
      if (message.data !== "sharedStateReady") {
        return;
      }
      const current = ref.current.contentWindow.dynamicState_o.sharedState;
      sharedState.current = current;
      setTimeout(() => {
        setValues({ props, sharedState: current });
      }, 100);
    }
    window.addEventListener("message", processMessage);

    return () => window.removeEventListener("message", processMessage);
  }, [props]);

  useEffect(() => {
    if (sharedState.current) {
      setValues({ props, sharedState: sharedState.current });
    }
  }, [props]);

  return (
    <div id="pageRender_o">
      <iframe
        ref={ref}
        id="pageRender_iframe"
        src={props && "/playground?empty=true"}
      />
    </div>
  );
}
