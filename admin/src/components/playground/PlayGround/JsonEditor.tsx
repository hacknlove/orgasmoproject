import { useEffect, useRef } from "react";

import { JSONEditor } from "../../../../ext/jsoneditor";

export default function JSONEditorWrapper(props) {
  const refContainer = useRef(null) as any;
  const refEditor = useRef(null) as any;

  useEffect(() => {
    if (!refContainer.current) {
      return;
    }
    if (refEditor.current) {
      return;
    }
    refEditor.current = new JSONEditor({
      target: refContainer.current,
      props,
    });

    return () => {
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, [refEditor.current, refContainer.current]);

  useEffect(() => {
    if (refEditor.current) {
      refEditor.current.updateProps(props);
    }
  }, [props]);

  return <div className="svelte-jsoneditor-react" ref={refContainer}></div>;
}
