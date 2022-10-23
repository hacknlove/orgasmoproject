import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import { useEffect } from "react";
import Alert from "../../modals/Alert";

async function updateProps({ filePath, fileContent, pathParams, setProps }) {
  if (!filePath || !fileContent) {
    return;
  }

  fileContent = JSON.parse(fileContent);

  if (fileContent.patternPath && !pathParams) {
    return;
  }

  const props = await fetch("/api/_oadmin/playGround/expand", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      fileContent,
      filePath,
      pathParams,
    }),
  })
    .then((r) => r.json())
    .catch((error) => ({ error }));

  if (props.error) {
    return asyncit(Alert, props.error, "playgroundModal_o");
  }

  if (props.props) {
    setProps(props.props);
  }
}

function setValues({ sharedState, props }) {
  for (const key of Array.from(sharedState.resources.keys())) {
    if (key === "var://DComponent") {
      continue;
    }
    sharedState.setValue(key, null);
  }

  sharedState.setValue("var://layout", props.layout);
  const areasNames = [] as string[];

  for (const areaName in props.areas) {
    areasNames.push(areaName);
    sharedState.setValue(`var://area/${areaName}`, props.areas[areaName]);
  }
  sharedState.setValue("var://areasNames", areasNames);
}

function resetState(sharedState) {
  sharedState.setValue("var://areasNames", []);
  for (const key of Array.from(sharedState.resources.keys())) {
    if (key === "var://DComponent") {
      continue;
    }
    if (key === "var://areasNames") {
      continue;
    }
    sharedState.setValue(key, null);
  }
}

export default function useExpandPage({
  sharedState,
  filePath,
  fileContent,
  pathParams,
}) {
  const [props, setProps] = useDynamicValue(`var://file${filePath}?props`);

  useEffect(() => {
    updateProps({
      filePath,
      fileContent,
      pathParams,
      setProps,
    });
  }, [filePath, fileContent, pathParams, setProps]);

  useEffect(() => {
    if (!sharedState) {
      return;
    }
    if (!props) {
      return resetState(sharedState);
    }
    setValues({ sharedState, props });
  }, [props, sharedState]);
}
