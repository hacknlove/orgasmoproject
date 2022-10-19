import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Prompt from "../../../modals/Prompt";
import { match, pathToRegexp } from "path-to-regexp";
import Alert from "../../../modals/Alert";
import { cencode } from "cencode";

export default function PlaygroundSelectPathSample_o({
  pathSamples,
  patternPath,
}) {
  const router = useRouter();

  const [regexpPath, matchPath] = useMemo(
    () => [pathToRegexp(patternPath), match(patternPath)],
    [patternPath]
  );

  const [customPaths, setCustomPaths] = useState<any[]>([]);

  async function onChange(event) {
    let value = event.target.value;

    if (value === "custom_o") {
      value = await asyncit(
        Prompt,
        { title: "New sample path", pattern: regexpPath.toString() },
        "playgroundModal_o"
      );
      if (!value) {
        return;
      }
      if (regexpPath.test(value)) {
        setCustomPaths([...customPaths, value]);
      }
    }

    const parsedPath = matchPath(value);

    (window as any).testthis = {
      parsedPath,
      value,
    };

    if (!parsedPath) {
      return asyncit(
        Alert,
        { title: "Error", text: "The path does not match the pattern" },
        "playgroundModal_o"
      );
    }

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        pathSample: value,
        parsedPath: cencode(parsedPath.params),
      },
    });
  }

  return (
    <select value={router.query.pathSample} onChange={onChange}>
      <option value="">Choose a path</option>
      {pathSamples.map((pathSample) => (
        <option key={pathSample} value={pathSample}>
          {pathSample}
        </option>
      ))}
      {customPaths.map((pathSample) => (
        <option key={pathSample} value={pathSample}>
          {pathSample}
        </option>
      ))}
      <option value="custom_o">add custom sample path</option>
    </select>
  );
}
