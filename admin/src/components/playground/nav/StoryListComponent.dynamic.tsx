import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";
import RadixIconsComponent2 from "../../icons/RadixIconsComponent2";
import RadixIconsBookmark from "../../icons/RadixIconsBookmark";


const opened = {};

interface StoryListComponentParams {
  component: string;
  stories: Record<string, any>;
}

export default function StoryListComponent({
  component,
  stories,
}: StoryListComponentParams) {
  const router = useRouter();

  const keepOpened = useCallback(
    (event) => {
      opened[component] = !event.currentTarget.open;
    },
    [component]
  );

  return (
    <details
      className="MainLayout_nav_li"
      open={router.query.component === component || opened[component]}
      onClick={keepOpened}
    >
      <summary className="MainLayout_nav_li_sumary">
        <RadixIconsComponent2 className="MainLayout_nav_svg" /> {component}
      </summary>
      <ul className="MainLayout_nav_li_ul">
        {Object.entries(stories).map(([name, { description }]) => (
          <li
            key={name}
            className={`MainLayout_nav_li_ul_li ${
              router.query.component === component &&
              router.query.story === name
                ? "MainLayout_nav_active_o"
                : ""
            }`}
          >
            <Link href={`/playground?component=${component}&story=${name}`}>
              <a className="MainLayout_nav_li_ul_li_a" title={description}>
                <RadixIconsBookmark className="MainLayout_nav_svg" /> {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
