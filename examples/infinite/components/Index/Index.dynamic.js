import Link from "next/link";

export default function Index({ links }) {
  return (
    <ul id="Index">
      {Object.entries(links).map(([href, text]) => (
        <li key={href}>
          <Link href={href}>{text}</Link>
        </li>
      ))}
    </ul>
  );
}
