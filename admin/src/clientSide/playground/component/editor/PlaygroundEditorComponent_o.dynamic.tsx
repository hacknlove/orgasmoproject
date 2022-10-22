import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useDynamicResource } from "@orgasmo/dynamicstate/react";

import Editor, { useMonaco } from "@monaco-editor/react";
import CarbonReset from "../../../icons/CarbonReset";
import CodiconSave from "../../../icons/CodiconSave";
import useUpdateComponent from "./useUpdateComponent";
import useEditItemConfig from "./useEditItemConfig";
import useEditDescription from "./useEditDescription";
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

export default function PlaygroundEditorComponent_o({
  description,
  itemConfig,
}) {
  const router = useRouter();
  const monaco = useMonaco();

  const isDirty = useDynamicResource(
    `var://${router.query.component}/${router.query.story}/isDirty_o`
  );

  const files = useRef({
    itemConfig: {
      monaco: {
        defaultLanguage: "JSON",
        path: "itemConfig",
      },
      field: "itemConfig",
      label: "Config",
      reset: () => {
        const jsonstring = JSON.stringify(itemConfig, null, 2);
        monaco?.editor
          ?.getModel?.("file:///itemConfig" as any)
          ?.setValue(jsonstring);
        editItemConfig.setValue(jsonstring);
      },
    },
    description: {
      monaco: {
        defaultLanguage: "Markdown",
        path: "descriptionFile",
      },
      field: "description",
      label: "Description",
      reset: () => {
        monaco?.editor
          ?.getModel?.("file:///descriptionFile" as any)
          ?.setValue(description);
        editDescription.setValue(description);
      },
    },
  } as Record<string, any>);

  const editItemConfig = useEditItemConfig(
    itemConfig,
    files.current.itemConfig
  );
  const editDescription = useEditDescription(
    description,
    files.current.description
  );

  useUpdateComponent(editItemConfig.value);

  const save = useSave({ files, description, itemConfig });

  const [file, setFile] = useState("itemConfig");

  useEffect(() => {
    (window as any).monaco = monaco;
    isDirty.setValue(editItemConfig.isDirty || editDescription.isDirty);
  }, [editDescription.isDirty, editItemConfig.isDirty]);

  useEffect(() => {
    const jsonstring = JSON.stringify(itemConfig, null, 2);

    editDescription.setValue(description);
    editItemConfig.setValue(jsonstring);

    monaco?.editor
      ?.getModel?.("file:///itemConfig" as any)
      ?.setValue(jsonstring);

    monaco?.editor
      ?.getModel?.("file:///descriptionFile" as any)
      ?.setValue(description);
  }, [description, itemConfig]);

  return (
    <>
      <div className="tabs_o">
        <button
          className={`tab_o ${file === "description" ? "active_o" : ""}`}
          onClick={() => setFile("description")}
        >
          Description
          <IsDirtyButtons save={save} file={files.current.description} />
        </button>
        <button
          className={`tab_o ${file === "itemConfig" ? "active_o" : ""}`}
          onClick={() => setFile("itemConfig")}
        >
          Config
          <IsDirtyButtons save={save} file={files.current.itemConfig} />
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

// https://github.com/json-editor/json-editor
