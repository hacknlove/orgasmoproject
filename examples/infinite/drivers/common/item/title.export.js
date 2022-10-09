export default function itemHeader({ params, meta = [] }) {
  return [...meta, ["title", `${params.parsedPath.string} - ${params.parsedPath.number}`]]
}
