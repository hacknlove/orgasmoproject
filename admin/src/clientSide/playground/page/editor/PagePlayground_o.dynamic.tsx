import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useDynamicResource } from "@orgasmo/dynamicstate/react";

import Editor, { useMonaco } from "@monaco-editor/react";
import CarbonReset from "../../../icons/CarbonReset";
import CodiconSave from "../../../icons/CodiconSave";
import useUpdateComponent from "./useUpdateComponent";
import useEditPageConfig from "./useEditPageConfig";
import useSave from "./useSave";

function IsDirtyButtons({ save, file }) {
  if (!file.edit.isDirty) {
    return null;
  }

  return (
    <div className="øTabButtons">
      <CarbonReset onClick={file.reset} />
      <CodiconSave onClick={() => save(file)} />
    </div>
  );
}

export default function PagePlayground_o({ pageConfig }) {
  const router = useRouter();
  const monaco = useMonaco();

  const isDirty = useDynamicResource(
    `var://page/${router.query.path}/${router.query.pageId}/isDirty_o`
  );

  const files = useRef({
    pageConfig: {
      monaco: {
        defaultLanguage: "JSON",
        path: "pageConfig",
      },
      field: "pageConfig",
      label: "Config",
      reset: () => {
        const jsonstring = JSON.stringify(pageConfig, null, 2);
        monaco?.editor
          ?.getModel?.("file:///pageConfig" as any)
          ?.setValue(jsonstring);
        editPageConfig.setValue(jsonstring);
      },
    },
  } as Record<string, any>);

  const editPageConfig = useEditPageConfig(
    pageConfig,
    files.current.pageConfig
  );

  useUpdateComponent(editPageConfig.value);

  const save = useSave({ files, editPageConfig });

  const [file, setFile] = useState("pageConfig");

  useEffect(() => {
    (window as any).monaco = monaco;
    isDirty.setValue(editPageConfig.isDirty);
  }, [editPageConfig.isDirty]);

  useEffect(() => {
    const jsonstring = JSON.stringify(pageConfig, null, 2);

    editPageConfig.setValue(jsonstring);

    monaco?.editor
      ?.getModel?.("file:///pageConfig" as any)
      ?.setValue(jsonstring);
  }, [pageConfig]);

  return (
    <>
      <div className="tabs_o">
        <button
          className={`øtab ${file === "pageConfig" ? "øactive" : ""}`}
          onClick={() => setFile("pageConfig")}
        >
          Config
          <IsDirtyButtons save={save} file={files.current.pageConfig} />
        </button>
        <div style={{ flexGrow: 1 }}></div>
      </div>
      <div id="StoryPlaygroundEditor_o">
        <Editor
          theme="vs-dark"
          className=" overflow-hidden"
          {...files.current[file].monaco}
          options={{
            padding: {
              bottom: 0,
            },
            scrollBeyondLastLine: false,
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
    </>
  );
}
