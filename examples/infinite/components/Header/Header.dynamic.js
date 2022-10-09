import Link from "next/link";

import { IcBaselineHome } from "../Icons";
export default function Header({ text, home }) {
  return (
    <>
      <h1 className="Header">
        {home ? (
          <Link href="/">
            <a>
              <IcBaselineHome />
            </a>
          </Link>
        ) : (
          <span></span>
        )}
        {text}
        <span></span>
      </h1>
    </>
  );
}
