import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import GrommetIconsStorage from "../../icons/GrommetIconsStorage";

export default function KVStorageLi({ label, description }) {
  const filePath = `/value/${label}`;
  const [activeFilepath, setActiveFilepath] = useDynamicValue(
    "var://activeFilepath_o"
  );
  const selected = activeFilepath == filePath;

  const [isDirty] = useDynamicValue(`com://file${filePath}?isDirty`, {
    computation(state) {
      return (
        state[`var://file${filePath}?content`] !==
        state[`var://file${filePath}?original`]
      );
    },
    urls: [`var://file${filePath}?content`, `var://file${filePath}?original`],
  });

  return (
    <li
      className={`MainLayout_nav_li_ul_li ${
        selected ? "MainLayout_nav_active_o" : ""
      }`}
      onClick={() => setActiveFilepath(filePath)}
    >
      <a className="MainLayout_nav_li_ul_li_a" title={description}>
        <GrommetIconsStorage className="MainLayout_nav_svg" /> {label}{" "}
        {isDirty ? "*" : ""}
      </a>
    </li>
  );
}
