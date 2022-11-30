import matchCriteria from "./matchCriteria";

export default function filterCriteria(pageConfigs, criteria, actual) {
  const actualSet = new Set(actual);

  return pageConfigs.filter((pageConfig) =>
    matchCriteria({
      rules: pageConfig[criteria],
      actualSet,
    })
  );
}
