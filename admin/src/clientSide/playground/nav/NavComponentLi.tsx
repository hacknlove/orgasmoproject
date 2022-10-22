import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import RadixIconsBookmark from "../../icons/RadixIconsBookmark";

export default function NavComponentLi({ storyName, description, component }) {
  const filePath = `/component/${component}/${storyName}`;
  const [activeFilepath, setActiveFilepath] = useDynamicValue(
    "var://activeFilepath_o"
  );

  const selected = activeFilepath == filePath;

  return (
    <li
      className={`MainLayout_nav_li_ul_li ${
        selected ? "MainLayout_nav_active_o" : ""
      }`}
      onClick={() => setActiveFilepath(filePath)}
    >
      <a className="MainLayout_nav_li_ul_li_a" title={description}>
        <RadixIconsBookmark className="MainLayout_nav_svg" /> {storyName}
      </a>
    </li>
  );
}
