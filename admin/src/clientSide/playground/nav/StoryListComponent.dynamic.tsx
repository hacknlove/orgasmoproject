import { useCallback } from "react";
import RadixIconsComponent2 from "../../icons/RadixIconsComponent2";
import NavComponentLi from "./NavComponentLi";

const opened = {};

interface StoryListComponentParams {
  component: string;
  stories: Record<string, any>;
}

export default function StoryListComponent({
  component,
  stories,
}: StoryListComponentParams) {
  const keepOpened = useCallback(
    (event) => {
      opened[component] = !event.currentTarget.open;
    },
    [component]
  );

  return (
    <details
      className="MainLayout_nav_li"
      open={opened[component]}
      onClick={keepOpened}
    >
      <summary className="MainLayout_nav_li_sumary">
        <RadixIconsComponent2 className="MainLayout_nav_svg" /> {component}
      </summary>
      <ul className="MainLayout_nav_li_ul">
        {Object.entries(stories).map(([name, { description }]) => (
          <NavComponentLi
            key={name}
            storyName={name}
            description={description}
            component={component}
          />
        ))}
      </ul>
    </details>
  );
}
