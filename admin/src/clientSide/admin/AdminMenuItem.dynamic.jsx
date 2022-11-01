import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import { useContext } from "react";
import AdminContext from "./AdminContext";
import DComponent from "@orgasmo/orgasmo/DComponent";

export default function AdminButton({ label, area, modal }) {
  const { chooseMenu, Components } = useContext(AdminContext);

  return (
    <div
      className="_oadmin_menu_item"
      onClick={(event) => {
        event.stopPropagation();
        if (area) {
          chooseMenu(area);
        }

        if (Components[modal]) {
          asyncit(
            DComponent,
            { type: modal, props: {}, Components },
            "playgroundModal_o"
          );
        }
      }}
    >
      {label}
    </div>
  );
}
