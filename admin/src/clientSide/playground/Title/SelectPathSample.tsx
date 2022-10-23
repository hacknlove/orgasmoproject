import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import Prompt from "../../modals/Prompt";
import { match, pathToRegexp } from "path-to-regexp";
import Alert from "../../modals/Alert";
import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import { useMemo, useEffect } from "react";

function Select({ data, setContent, filePath }) {
  const [regexpPath, matchPath] = useMemo(
    () => [pathToRegexp(data.patternPath), match(data.patternPath)],
    [data]
  );

  const [pathParams, setPathParams] = useDynamicValue(
    `var://file${filePath}?params`
  );

  useEffect(() => {
    if (!pathParams && data.pathSamples?.length) {
      onChange({ target: { value: data.pathSamples[0] } });
    }
  }, []);

  async function onChange(event) {
    let value = event.target.value;

    if (value === " add ") {
      value = await asyncit(
        Prompt,
        {
          title: "New sample path",
          pattern: regexpPath.toString(),
          label: data.patternPath,
          required: true,
        },
        "playgroundModal_o"
      );
      if (!value) {
        return;
      }
      console.log({
        value,
        regexpPath,
        patternPath: data.patternPath,
      });
      if (regexpPath.test(value)) {
        data.pathSamples ??= [];
        setContent(
          JSON.stringify(
            {
              ...data,
              pathSamples: [...data.pathSamples, value],
            },
            null,
            4
          )
        );
      }
    }

    if (!value) {
      return;
    }

    const parsedPath = matchPath(value);

    if (!parsedPath) {
      return asyncit(
        Alert,
        { title: "Error", text: "The path does not match the pattern" },
        "playgroundModal_o"
      );
    }

    setPathParams({
      path: value,
      params: parsedPath.params,
    });
  }

  return (
    <select value={pathParams?.path} onChange={onChange}>
      <option value="">Choose a path</option>
      {data.pathSamples?.map?.((pathSample) => (
        <option key={pathSample} value={pathSample}>
          {pathSample}
        </option>
      ))}
      <option value=" add ">add custom sample path</option>
    </select>
  );
}

export default function SelectPathSample({ filePath }) {
  const [content, setContent] = useDynamicValue(
    `var://file/${filePath}?content`
  );

  const data = useMemo(() => {
    try {
      return JSON.parse(content);
    } catch {
      /**/
    }
  }, [content]);

  if (!data?.patternPath) {
    return null;
  }

  return <Select data={data} setContent={setContent} filePath={filePath} />;
}
