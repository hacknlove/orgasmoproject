export default function Svg({ path, ...props }) {
  if (!Array.isArray(path)) {
    path = [path];
  }

  return (
    <svg {...props}>
      {path.map(({ d, ...props }) => (
        <path key={d} d={d} {...props} />
      ))}
    </svg>
  );
}
