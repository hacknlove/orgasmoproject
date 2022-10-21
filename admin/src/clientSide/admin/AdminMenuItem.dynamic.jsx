import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import { useContext } from "react";
import AdminContext from "./AdminContext";
export default function AdminButton({ label, area, modal }) {
  const { chooseMenu, DComponent, Components } = useContext(AdminContext);

  return (
    <div
      className="_oadmin_menu_item"
      onClick={(event) => {
        event.stopPropagation();
        if (area) {
          chooseMenu(area);
        }

        if (Components[modal]) {
          asyncit(DComponent, { type: modal, props: {} }, "playgroundModal_o");
        }
      }}
    >
      {label}
    </div>
  );
}
