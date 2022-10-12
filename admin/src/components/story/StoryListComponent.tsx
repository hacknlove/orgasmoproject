import Link from "next/link";
import { SVGProps, useCallback } from "react";
import { useRouter } from "next/router";

export function RadixIconsComponent2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 15 15" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3.88 1h7.24c.403 0 .735 0 1.006.022c.281.023.54.072.782.196a2 2 0 0 1 .874.874c.124.243.173.501.196.782c.022.27.022.603.022 1.005v7.241c0 .403 0 .735-.022 1.006c-.023.281-.072.54-.196.782a2 2 0 0 1-.874.874c-.243.124-.501.173-.782.196c-.27.022-.603.022-1.005.022H3.88c-.403 0-.735 0-1.006-.022c-.281-.023-.54-.072-.782-.196a2 2 0 0 1-.874-.874c-.124-.243-.173-.501-.196-.782C1 11.856 1 11.523 1 11.12V3.88c0-.403 0-.735.022-1.006c.023-.281.072-.54.196-.782a2 2 0 0 1 .874-.874c.243-.124.501-.173.782-.196C3.144 1 3.477 1 3.88 1Zm-.924 1.019c-.22.018-.332.05-.41.09a1 1 0 0 0-.437.437c-.04.078-.072.19-.09.41C2 3.18 2 3.472 2 3.9V7h5V2H3.9c-.428 0-.72 0-.944.019ZM7 8H2v3.1c0 .428 0 .72.019.944c.018.22.05.332.09.41a1 1 0 0 0 .437.437c.078.04.19.072.41.09c.225.019.516.019.944.019H7V8Zm1 0h5v3.1c0 .428 0 .72-.019.944c-.018.22-.05.332-.09.41a1 1 0 0 1-.437.437c-.078.04-.19.072-.41.09c-.225.019-.516.019-.944.019H8V8Zm5-1H8V2h3.1c.428 0 .72 0 .944.019c.22.018.332.05.41.09a1 1 0 0 1 .437.437c.04.078.072.19.09.41c.019.225.019.516.019.944V7Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function ClarityBookmarkLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
      <path
        fill="currentColor"
        d="M26 34a2 2 0 0 1-1.41-.58L18 26.82l-6.54 6.52A2 2 0 0 1 8 31.93V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2Zm0-2V4H10v27.93L18 24Z"
        className="clr-i-outline clr-i-outline-path-1"
      ></path>
      <path fill="none" d="M0 0h36v36H0z"></path>
    </svg>
  );
}

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
      className="StoryListComponent"
      open={router.query.component === component || opened[component]}
      onClick={keepOpened}
    >
      <summary className="StoryListComponent_summary">
        <RadixIconsComponent2 className="RadixIconsComponent2" /> {component}
      </summary>
      <ul className="StoryListComponent_ul">
        {Object.entries(stories).map(([name, { description }]) => (
          <li
            key={name}
            className={`StoryListComponent_li ${
              router.query.component === component &&
              router.query.story === name
                ? "StoryListComponent_li_selected"
                : ""
            }`}
          >
            <Link href={`/story?component=${component}&story=${name}`} shallow>
              <a className="StoryListComponent_a" title={description}>
                {" "}
                <ClarityBookmarkLine className="ClarityBookmarkLine" />
                {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
