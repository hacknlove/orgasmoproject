import { useEffect, useRef } from "react";

export default function JSONEditor(props) {
  const refContainer = useRef(null) as any;
  const refEditor = useRef(null) as any;

  useEffect(() => {
    if (!refContainer.current) {
      return;
    }
    import("vanilla-jsoneditor").then(({ JSONEditor }) => {
      if (refEditor.current) {
        return null;
      }
      refEditor.current = new JSONEditor({
        target: refContainer.current,
        props,
      });
    });

    return () => {
      // destroy editor
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, [refEditor.current, refContainer.current]);

  // update props
  useEffect(() => {
    if (refEditor.current) {
      console.log("update props", props);
      refEditor.current.updateProps(props);
    }
  }, [props]);

  return <div className="svelte-jsoneditor-react" ref={refContainer}></div>;
}
