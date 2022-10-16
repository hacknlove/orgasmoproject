import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";
import TeenyiconsFolderOutline from "../../icons/TeenyiconsFolderOutline";
import IconoirEmptyPage from "../../icons/IconoirEmptyPage";

const opened = {};

interface StoryListComponentParams {
  path: string;
  stories: Record<string, any>;
}

export default function PageListComponent({
  path,
  stories,
}: StoryListComponentParams) {
  const router = useRouter();

  const keepOpened = useCallback(
    (event) => {
      opened[path] = !event.currentTarget.open;
    },
    [path]
  );

  return (
    <details
      className="MainLayout_nav_li"
      open={router.query.path === path || opened[path]}
      onClick={keepOpened}
    >
      <summary className="MainLayout_nav_li_sumary">
        <TeenyiconsFolderOutline className="MainLayout_nav_svg" /> {path}
      </summary>
      <ul className="MainLayout_nav_li_ul">
        {Object.entries(stories).map(([pageId, { description }]) => (
          <li
            key={pageId}
            className={`MainLayout_nav_li_ul_li ${
              router.query.path === path && router.query.pageId === pageId
                ? "MainLayout_nav_active_o"
                : ""
            }`}
          >
            <Link href={`/playground?path=${path}&pageId=${pageId}`}>
              <a className="MainLayout_nav_li_ul_li_a" title={description}>
                {" "}
                <IconoirEmptyPage className="MainLayout_nav_svg" />
                {pageId}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
