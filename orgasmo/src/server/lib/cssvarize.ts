export default function cssvarize(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [`--${key}`, value])
  );
}
