import { useRouter } from "next/router";
import { useState, useMemo, useEffect, useContext } from "react";
import * as equal from "fast-deep-equal";
import AreasContext from "@orgasmo/orgasmo/AreasContext";
import { useDynamicResource } from "@orgasmo/dynamicstate/react";

import Editor, { useMonaco } from "@monaco-editor/react";

export default function StoryPlayground({ description, itemConfig }) {
  const router = useRouter();
  const monaco = useMonaco();

  const [editItemConfig, setEditItemConfig] = useState<string>(
    JSON.stringify(itemConfig, null, 2)
  );

  const { setAreas } = useContext(AreasContext);

  const [editNotes, setEditNotes] = useState(description);

  const isDirty = useDynamicResource(
    `var://${router.query.component}/${router.query.story}/isDirty`
  );

  const isItemConfigDirty = useMemo(() => {
    try {
      return !equal(itemConfig, JSON.parse(editItemConfig));
    } catch {
      return false;
    }
  }, [editItemConfig, itemConfig]);

  const isNotesDirty = useMemo(
    () => editNotes !== description,
    [editNotes, description]
  );

  const [itemConfigFile, notesFile] = useMemo(() => {
    return [
      {
        defaultValue: editItemConfig,
        defaultLanguage: "JSON",
        onChange: (value) => setEditItemConfig(value || ""),
        path: "itemConfig",
        reset: () => {
          const jsonstring = JSON.stringify(itemConfig);
          monaco?.editor
            ?.getModel?.("file:///itemConfig" as any)
            ?.setValue(jsonstring);
          setEditItemConfig(jsonstring);
        },
        isDirty: () => {
          return isItemConfigDirty;
        },
      },
      {
        defaultValue: editNotes,
        defaultLanguage: "Markdown",
        onChange: (value) => setEditNotes(value || ""),
        path: "notesFile",
        reset: () => {
          monaco?.editor
            ?.getModel?.("file:///notesFile" as any)
            ?.setValue(description);
          setEditNotes(description);
        },
        isDirty: () => isNotesDirty,
      },
    ];
  }, [setEditItemConfig]);

  const [file, setFile] = useState(notesFile);

  useEffect(() => {
    try {
      const json = JSON.parse(editItemConfig);

      setAreas((areas) => ({
        ...areas,
        storyComponent: {
          items: [
            {
              type: "StoryRender",
              props: {
                itemConfig: json,
              },
            },
          ],
        },
      }));
    } catch {
      //
    }
  }, [editItemConfig]);

  useEffect(() => {
    isDirty.setValue(isItemConfigDirty || isNotesDirty);
  }, [isItemConfigDirty, isNotesDirty]);

  useEffect(() => {
    setEditItemConfig(JSON.stringify(itemConfig));
    setEditNotes(description);
  }, [description, itemConfig]);

  const showButtons =
    (file === itemConfigFile && isItemConfigDirty) ||
    (file === notesFile && isNotesDirty);

  return (
    <>
      <div id="StoryPlayground_buttons"></div>
      <div className="øtabs">
        <button
          className={`øtab ${file === notesFile ? "øactive" : ""}`}
          onClick={() => setFile(notesFile)}
        >
          Notes {isNotesDirty ? "*" : ""}
        </button>
        <button
          className={`øtab ${file === itemConfigFile ? "øactive" : ""}`}
          onClick={() => setFile(itemConfigFile)}
        >
          Config {isItemConfigDirty ? "*" : ""}
        </button>
        <div style={{ flexGrow: 1 }}></div>

        {showButtons && (
          <>
            <button className="øbuttons" onClick={file.reset}>
              Reset
            </button>
            <button className="øbuttons">Save as</button>
            <button className="øbuttons">Save</button>
          </>
        )}
      </div>
      <div id="StoryPlaygroundEditor">
        <Editor
          theme="vs-dark"
          className=" overflow-hidden"
          {...file}
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
