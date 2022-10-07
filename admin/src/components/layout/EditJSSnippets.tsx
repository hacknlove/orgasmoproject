import AdminContext from "../AdminContext";
import { useContext, useRef } from "react";

export default function EditJSSnipplets() {
  const { updatePageConfig, pageConfig } = useContext(AdminContext) as any;
  const ref: any = useRef();

  return (
    <div className="_oad">
      <label>Edit JS snippets</label>
      <textarea
        ref={ref}
        autoFocus={true}
        defaultValue={pageConfig?.layout?.jssnippets}
        cols={80}
        rows={20}
      />
      <div>
        <button
          onClick={() => {
            ref.current.value = pageConfig?.layout?.jssnippets || "";
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            updatePageConfig({
              ...pageConfig,
              layout: {
                ...pageConfig.layout,
                jssnippets: ref.current.value,
              },
            });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
