import Editor, { useMonaco } from "@monaco-editor/react";
import useFile from "./useFile";
import { useEffect } from "react";
import { useDynamicValue } from "@orgasmo/dynamicstate/react";

export default function Monaco() {
  useFile();

  const [filePath] = useDynamicValue("var://activeFilepath_o");
  const [, setFileContent] = useDynamicValue(`var://file${filePath}?content`);
  const [rawFileContent, setRawFileContent] = useDynamicValue(
    `var://file${filePath}?raw`
  );

  const monaco = useMonaco();

  function onChange(value) {
    setRawFileContent(value);
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
    if (rawFileContent === undefined) {
      return;
    }
    const model = monaco?.editor?.getModels?.()?.[0];

    if (model?.getValue() === rawFileContent) {
      return;
    }

    monaco?.editor?.getModels?.()?.[0]?.setValue?.(rawFileContent);
  }, [rawFileContent, monaco?.editor]);

  if (!filePath) {
    return null;
  }

  return (
    <div id="monaco-wrapper_o">
      <Editor
        theme="vs-dark"
        options={{
          padding: {
            bottom: 50,
          },
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false,
          },
        }}
        defaultLanguage="json"
        onChange={onChange}
      />
    </div>
  );
}
