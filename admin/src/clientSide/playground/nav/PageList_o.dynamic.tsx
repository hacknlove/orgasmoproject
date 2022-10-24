import { useCallback } from "react";
import { useRouter } from "next/router";
import TeenyiconsFolderOutline from "../../icons/TeenyiconsFolderOutline";
import PageLi from "./PageLi";

const opened = {};

interface StoryListComponentParams {
  path: string;
  stories: Record<string, any>;
}

export default function PageList_o({
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
          <PageLi key={pageId} pageId={pageId} description={description} />
        ))}
      </ul>
    </details>
  );
}
