import AdminContext from "../AdminContext.dynamic";
import { useContext, useRef } from "react";

export default function EditJSSnipplets() {
  const { updatePageConfig, pageConfig } = useContext(AdminContext) as any;
  const ref: any = useRef();

  return (
    <div className="_oadmin_dialog">
      <label>Edit JS snippets</label>
      <textarea
        ref={ref}
        defaultValue={pageConfig?.layout?.jssnippets}
        cols={80}
        rows={20}
      />
      <div>
        <button
          className="button_o"
          onClick={() => {
            ref.current.value = pageConfig?.layout?.jssnippets || "";
          }}
        >
          Reset
        </button>
        <button
          className="button_o"
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
