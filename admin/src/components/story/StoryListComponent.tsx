import Link from "next/link";

export default function StoryListComponent({ component, stories }) {
  return (
    <details>
      <summary>{component}</summary>
      <ul>
        {stories.map(({ name, description }) => (
          <li key={name}>
            <Link href={`/story/${component}/${name}`}>
              <a title={description}> - {name} - </a>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
