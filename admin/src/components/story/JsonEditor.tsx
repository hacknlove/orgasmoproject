import { useEffect, useRef } from "react";

export default function JSONEditor(props) {
  const refContainer = useRef(null) as any;
  const refEditor = useRef(null) as any;

  useEffect(() => {
    // create editor
    console.log("hola");

    import("vanilla-jsoneditor").then(({ JSONEditor }) => {
      if (refEditor.current) {
        return;
      }
      console.log("create editor", refContainer.current);
      refEditor.current = new JSONEditor({
        target: refContainer.current,
        props: {},
      });
    });

    return () => {
      console.log("destrouy");
      // destroy editor
      if (refEditor.current) {
        console.log("destroy editor");
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  // update props
  useEffect(() => {
    if (refEditor.current) {
      console.log("update props", props);
      refEditor.current.updateProps(props);
    }
  }, [props]);

  return <div className="svelte-jsoneditor-react" ref={refContainer}></div>;
}
