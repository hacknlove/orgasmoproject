export default function Card({ href, title, content }) {
  return (
    <div>
      <a href={href} className="card">
        <h2>{title} &rarr;</h2>
        <p>{content}</p>
      </a>
    </div>
  );
}
