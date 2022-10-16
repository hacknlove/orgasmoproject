import Link from "next/link";
import { SVGProps, useCallback } from "react";
import { useRouter } from "next/router";

export function TeenyiconsFolderOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 15 15" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        d="M.5 12.5v-10a1 1 0 0 1 1-1h4l2 2h6a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1Z"
      ></path>
    </svg>
  );
}

export function IconoirPage(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M4 21.4V2.6a.6.6 0 0 1 .6-.6h11.652a.6.6 0 0 1 .424.176l3.148 3.148A.6.6 0 0 1 20 5.75V21.4a.6.6 0 0 1-.6.6H4.6a.6.6 0 0 1-.6-.6ZM8 10h8m-8 8h8m-8-4h4"></path>
        <path d="M16 2v3.4a.6.6 0 0 0 .6.6H20"></path>
      </g>
    </svg>
  );
}

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
      className="StoryListComponent"
      open={router.query.path === path || opened[path]}
      onClick={keepOpened}
    >
      <summary className="StoryListComponent_summary">
        <TeenyiconsFolderOutline className="RadixIconsComponent2" /> {path}
      </summary>
      <ul className="StoryListComponent_ul">
        {Object.entries(stories).map(([name, { description }]) => (
          <li
            key={name}
            className={`StoryListComponent_li ${
              router.query.path === path && router.query.story === name
                ? "StoryListComponent_li_selected"
                : ""
            }`}
          >
            <Link href={`/story?path=${path}&story=${name}`}>
              <a className="StoryListComponent_a" title={description}>
                {" "}
                <IconoirPage className="ClarityBookmarkLine" />
                {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
