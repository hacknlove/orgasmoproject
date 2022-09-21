export default function Description({ text, source }) {
  return (
    <div className="row">
      <p className="description">
        {text} <code className="code">{source}</code>
      </p>
    </div>
  );
}
