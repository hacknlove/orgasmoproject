import { useMemo } from "react";

export function AdminComponentsDataList({
  Components,
  filter = undefined,
  id = "_oadminComponents",
}) {
  const list = useMemo(() => Object.keys(Components), [Components]);
  return <AdminDataList list={list} filter={filter} id={id} />;
}

export function AdminDriversDataList({
  driverMethods,
  filter = undefined,
  id = "_oadminDrivers",
}) {
  return <AdminDataList list={driverMethods} filter={filter} id={id} />;
}

interface AdminCSSVarsDataListParams {
  filter?: (any) => boolean;
  id?: string;
}

export function AdminCSSVarsDataList({
  filter = undefined,
  id = "_oadminCSSVars",
}: AdminCSSVarsDataListParams) {
  const list = useMemo(() => {
    const varsSet = new Set<string>();

    for (const css of Array.from(document.styleSheets)) {
      if (css.href && !css.href.includes(window.location.origin)) {
        continue;
      }

      for (const rule of Array.from(css.cssRules)) {
        for (const [, match] of rule.cssText.matchAll(
          /var\s*\(\s*--([\w-]+)/g
        )) {
          varsSet.add(match);
        }
      }
    }

    const varsArray = Array.from(varsSet);
    varsArray.sort();

    return varsArray;
  }, []);

  return <AdminDataList list={list} filter={filter} id={id} />;
}

interface AdminDataListParams {
  list: string[];
  filter?: (any) => boolean;
  id?: string;
}
export default function AdminDataList({
  list,
  filter,
  id,
}: AdminDataListParams) {
  const filtered = useMemo(() => {
    if (!filter) {
      return list;
    }
    return list.filter(filter);
  }, [list, filter]);
  return (
    <>
      <datalist id={id}>
        {filtered.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>
    </>
  );
}
