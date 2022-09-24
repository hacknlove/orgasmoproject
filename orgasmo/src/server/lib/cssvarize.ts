export default function cssvarize(obj: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [`--${key}`, value])
  );
}
