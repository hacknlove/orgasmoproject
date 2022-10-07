import AdminContext from "../AdminContext";
import { useContext, useRef } from "react";
import { AdminComponentsDataList } from "../AdminDataLists";

export default function EditLayoutName() {
  const { updatePageConfig, pageConfig, Components } = useContext(
    AdminContext
  ) as any;
  const ref: any = useRef();

  return (
    <div className="_oad">
      <AdminComponentsDataList Components={Components} />
      <label>Edit Layout Name</label>
      <input
        ref={ref}
        type="text"
        autoFocus={true}
        list="_oadminComponents"
        defaultValue={pageConfig?.layout?.name}
      />
      <div>
        <button
          onClick={() => {
            ref.current.value = pageConfig?.layout?.name || "";
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
                name: ref.current.value,
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
