import AdminContext from "../admin/AdminContext.dynamic";
import { useContext, useRef } from "react";
import { AdminComponentsDataList } from "../admin/AdminDataLists.dynamic";

export default function EditLayoutName() {
  const { updatePageConfig, pageConfig, Components } = useContext(
    AdminContext
  ) as any;
  const ref: any = useRef();

  return (
    <div className="_oadmin_dialog">
      <AdminComponentsDataList Components={Components} />
      <label>Edit Layout Name</label>
      <input
        ref={ref}
        type="text"
        list="_oadminComponents"
        defaultValue={pageConfig?.layout?.name}
      />
      <div>
        <button
          className="_oadmin_button"
          onClick={() => {
            ref.current.value = pageConfig?.layout?.name || "";
          }}
        >
          Reset
        </button>
        <button
          className="_oadmin_button"
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
