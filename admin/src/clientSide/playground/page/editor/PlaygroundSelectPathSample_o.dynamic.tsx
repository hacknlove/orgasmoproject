import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import { useState } from "react";
import { useRouter } from "next/router";
import Prompt from "../../../modals/Prompt";

export default function PlaygroundSelectPathSample_o({ pathSamples }) {
  const router = useRouter();

  const [customPaths, setCustomPaths] = useState<any[]>([]);

  async function onChange(event) {
    let value = event.target.value;

    if (value === "custom_o") {
      value = await asyncit(
        Prompt,
        { title: "New sample path" },
        "playgroundModal_o"
      );
      if (!value) {
        return;
      }
      setCustomPaths([...customPaths, value]);
    }

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        pathSample: value,
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
