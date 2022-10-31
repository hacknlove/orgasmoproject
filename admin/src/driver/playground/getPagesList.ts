export default function getPagesList({ driver }) {
  return driver?.admin?.getAllPages?.()?.catch(() => ({})) || {};
}
