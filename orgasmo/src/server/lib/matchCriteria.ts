export default function matchCriteria({ rules, actualSet }) {
  if (!rules) {
    return true;
  }

  if (rules.cannot) {
    for (const key of rules.cannot) {
      if (actualSet.has(key)) {
        return false;
      }
    }
  }
  if (rules.must) {
    for (const key of rules.must) {
      if (!actualSet.has(key)) {
        return false;
      }
    }
  }
  if (rules.any) {
    for (const key of rules.any) {
      if (actualSet.has(key)) {
        return true;
      }
    }
    return false;
  }
  return true;
}
