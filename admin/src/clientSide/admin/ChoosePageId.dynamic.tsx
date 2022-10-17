import AdminContext from "./AdminContext.dynamic";
import { useContext, useCallback } from "react";

export default function ChoosePageId() {
  const { pageConfigIds, setSelectedPageId, pageConfig } = useContext(
    AdminContext
  ) as any;

  const onChange = useCallback(
    (event) => {
      setSelectedPageId(event.target.value);
    },
    [setSelectedPageId]
  );

  return (
    <select
      className="_oadmin_menu_item"
      value={pageConfig?.pageId}
      onChange={onChange}
    >
      {pageConfigIds?.map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
}
