import Editor, { useMonaco } from "@monaco-editor/react";
import useFile from "./useFile";
import { useEffect } from "react";
import { useDynamicValue } from "@orgasmo/dynamicstate/react";

export default function Monaco() {
  useFile();

  const [filePath] = useDynamicValue("var://activeFilepath_o");
  const [fileContent, setFileContent] = useDynamicValue(
    `var://file${filePath}?content`
  );

  const monaco = useMonaco();

  function onChange(value) {
    try {
      JSON.parse(value);
      setFileContent(value || "");
    } catch {
      //
    }
  }

  useEffect(() => {
    if (!filePath) {
      monaco?.editor?.getModels?.()?.[0]?.setValue?.("");
    }
  }, [filePath, monaco?.editor]);

  useEffect(() => {
    if (fileContent === undefined) {
      return;
    }
    const model = monaco?.editor?.getModels?.()?.[0];

    if (model?.getValue() === fileContent) {
      return;
    }

    monaco?.editor?.getModels?.()?.[0]?.setValue?.(fileContent);
  }, [fileContent, monaco?.editor]);

  if (!filePath) {
    return null;
  }

  return (
    <Editor
      theme="vs-dark"
      className="overflow-hidden"
      options={{
        padding: {
          bottom: 0,
        },
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
      }}
      defaultLanguage="json"
      onChange={onChange}
    />
  );
}
