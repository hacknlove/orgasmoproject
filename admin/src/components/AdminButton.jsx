import { useContext } from "react";
import AdminContext from "./AdminContext";
export default function AdminButton({ label, area }) {
  const { chooseModal } = useContext(AdminContext);

  return (
    <div
      className="_oab"
      onClick={(event) => {
        event.stopPropagation();
        chooseModal(area);
      }}
    >
      {label}
    </div>
  );
}
