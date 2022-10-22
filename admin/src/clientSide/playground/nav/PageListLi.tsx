import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import IconoirEmptyPage from "../../icons/IconoirEmptyPage";

export default function PageLi({ pageId, description }) {
  const filePath = `/page/${pageId}`;
  const [activeFilepath, setActiveFilepath] = useDynamicValue(
    "var://activeFilepath_o"
  );

  const isDirty = false;

  const selected = activeFilepath == filePath;

  return (
    <li
      className={`MainLayout_nav_li_ul_li ${
        selected ? "MainLayout_nav_active_o" : ""
      }`}
      onClick={() => setActiveFilepath(filePath)}
    >
      <a className="MainLayout_nav_li_ul_li_a" title={description}>
        {" "}
        <IconoirEmptyPage className="MainLayout_nav_svg" />
        {pageId} {isDirty ? "*" : ""}
      </a>
    </li>
  );
}
